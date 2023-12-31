import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
import { videoLinkSchema } from "@/validators/videoLinkSchema";
import { textSplitter } from "@/lib/textSplitter";
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs } from "@/lib/embedAndStore";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { extractVideoID } from "@/lib/extractVideoId";
import { fetchVideoDetails } from "@/lib/fetchVideoDetail";
import { toAscii } from "@/lib/toAscii";



type Props = {};



/* This function will be responsible for getting the transcript of the video then chunking
    it and embedding the chunked text in to pinconde. It will then create a new chat in the db returning the chat id which will be used on the frontend
*/

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { videoLink } = videoLinkSchema.parse(body);

  const videoId = extractVideoID(videoLink)

  if(!videoId) {
    throw new Error('No video id')
  }

  console.log('Fetching video details')
  const videoDetails = await fetchVideoDetails(videoId)
  console.log(videoDetails)

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoLink);
    // console.log(transcript)

    // TODO:
    // Get the video id and fetch the video details

    // Transcript is a array of objects 
    const wholeText = transcript.map((textObj) => textObj.text).join(" ");

    console.log("Preparing chunks");
    const chunkedText = await textSplitter(wholeText); // This is an array of Documents
    // console.log(chunkedText)

    // Create chat in db and return chat.id
    console.log('creating chat')
    const chat_id = await db
      .insert(chats)
      .values({
        videoUrl: videoLink,
        title: videoDetails.title,
        channelTitle: videoDetails.channelTitle,
        description: videoDetails.description,
        thumbnailUrl: videoDetails.thumbnail
      })
      .returning({
        chatId: chats.id,
      });

    // Embed individual documents to pinecone
    const pineconeClient = await getPineconeClient();
    // const sanitizedTitle = toAscii(videoDetails.title)
    await embedAndStoreDocs(pineconeClient, chunkedText, videoLink);

    
    

      console.log(chat_id[0].chatId)

    return NextResponse.json({ chat_id: chat_id[0].chatId }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }

//   console.log(videoLink);

//   return NextResponse.json({ videoLink }, { status: 200 });
}
