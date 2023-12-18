import {RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import {Document} from 'langchain/document'

// This function makes sure that the string is within the proper size when uploading to pinecone
export const truncateStringByBytes = (str:string, bytes: number) => {
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0,bytes))
}


export async function textSplitter(text: string) {

    try {
        
        const splitter = new RecursiveCharacterTextSplitter ({
            chunkSize: 1000,
            chunkOverlap: 50
        })
    
        const chunkedText = await splitter.splitDocuments([
            new Document({
                pageContent: text,
                metadata: {
                    text: truncateStringByBytes(text, 36000)
                }
            })
        ])
    
        return chunkedText
    } catch (error) {
        console.log(error)
        throw new Error('PDF docs chunking faild!')
    }
}