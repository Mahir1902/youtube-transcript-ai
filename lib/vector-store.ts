import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {PineconeStore} from 'langchain/vectorstores/pinecone'
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";


export async function embedAndStoreDocs( client: Pinecone, docs: Document<Record<string, any>>[], videoLink:string) {
    try {
        const embeddings = new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API})
        const index = client.Index(process.env.PINECONE_INDEX as string)


       const response = await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: index,
            namespace: videoLink,
        }) // can get embeddings from here later if needed.

        console.log('Embedded documents successfully!')

        

    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to load your docs')
        
    }
}