import OpenAI from "openai";
import {Message, OpenAIStream, StreamingTextResponse} from 'ai'
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = 'edge'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
})


export async function POST(req: Request) {
    try {
        
        const {messages, chatId} = await req.json()

        // The quesiton will be the last message in the message array
        const question = messages[messages.length - 1]

        const _chats = await db.select().from(chats).where(eq(chats.id, chatId))
        if(_chats.length !== 1) {
            return NextResponse.json({error: 'chat not found'}, {status: 404})
        }

        const videoLink = _chats[0].videoUrl

        const context = await getContext(question.content, videoLink)

        const prompt = {
            role:'system',
            content: `You are an enthusiastic AI assistant. Use the following pieces of context to answer the question at the end. The context will be a transcript from a youtube video. Read the whole thing thoroughly and ensure you understand what the video is about.
            If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
            If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
            
            START OF CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            
            `
        }


        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                prompt, ...messages.filter((message: Message) => message.role ==='user')
            ],
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)

    } catch (error) {
        
    }
}
