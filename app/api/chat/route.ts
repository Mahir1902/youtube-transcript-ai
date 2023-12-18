import OpenAI from "openai";
import {OpenAIStream, StreamingTextResponse} from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API
})


export async function POST(req: Request) {
    try {
        
        const {messages} = await req.json()

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: messages,
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)

    } catch (error) {
        
    }
}
