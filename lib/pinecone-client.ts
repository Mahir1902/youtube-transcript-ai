import {Pinecone} from '@pinecone-database/pinecone'



let pineconeClientInstance: Pinecone | null = null

async function initPineconeClient() {
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API as string,
        environment: process.env.PINECONE_ENV as string
    })

    return pinecone
}

export async function getPineconeClient() {
    if(!pineconeClientInstance) {
        pineconeClientInstance = await initPineconeClient()
    }

    return pineconeClientInstance
}