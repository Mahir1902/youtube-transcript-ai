import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
import { videoLinkSchema } from "@/validators/videoLinkSchema";
import axios from "axios";
import { textSplitter } from "@/lib/text-loader";
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";

type Props = {};



/* This function will be responsible for getting the transcript of the video then chunking
    it and embedding the chunked text in to pinconde. It will then create a new chat in the db returning the chat id which will be used on the frontend
*/

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { videoLink } = videoLinkSchema.parse(body);

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoLink);
    // console.log(transcript)

    const wholeText = transcript.map((textObj) => textObj.text).join(" ");

    console.log("Preparing chunks");
    const chunkedText = await textSplitter(wholeText); // This is an array of Documents
    // console.log(chunkedText)

    // Embed individual documents to pinecone
    const pineconeClient = await getPineconeClient();
    await embedAndStoreDocs(pineconeClient, chunkedText, videoLink);

    const chat_id = await db
      .insert(chats)
      .values({
        videoUrl: videoLink,
      })
      .returning({
        chatId: chats.id,
      });

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
