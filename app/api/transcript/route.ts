import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
import { videoLinkSchema } from "@/validators/videoLinkSchema";
import axios from "axios";
import { textSplitter } from "@/lib/text-loader";
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";

type Props = {
    
}



// const splitTextToChunk  = (text:string, chunkSize: number): string[] => {
//     const words = text.split(' ')
//     const chunks:string[] = []

//     for(let i= 0; i < words.length; i+=chunkSize) {
//         const chunk = words.slice(i, i + chunkSize).join(' ')
//         chunks.push(chunk)
//     }

//     return chunks

// }

export  async function POST(req:Request, res: Response) {


    const body = await req.json()

    const {videoLink} = videoLinkSchema.parse(body)

    const transcript = await YoutubeTranscript.fetchTranscript(videoLink)
    // console.log(transcript)

    const wholeText = transcript.map(textObj => textObj.text).join(' ')

    console.log('Preparing chunks')
    const chunkedText = await textSplitter(wholeText) // This is an array of Documents
    // console.log(chunkedText) 
    
    // Embed individual documents to pinecone
    const pineconeClient = await getPineconeClient()
    await embedAndStoreDocs(pineconeClient, chunkedText, videoLink)

    const chat_id = await db.insert(chats).values({
        videoUrl: videoLink,

    }).returning({
        chatId: chats.id
    })
    
    return NextResponse.json({chat_id: chat_id[0].chatId}, {status: 200})
    
  
}