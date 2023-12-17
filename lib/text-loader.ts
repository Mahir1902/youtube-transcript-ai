import {RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import {Document} from 'langchain/document'


export async function textSplitter(text: string) {

    try {
        
        const splitter = new RecursiveCharacterTextSplitter ({
            chunkSize: 1000,
            chunkOverlap: 50
        })
    
        const chunkedText = await splitter.splitDocuments([
            new Document({pageContent: text})
        ])
    
        return chunkedText
    } catch (error) {
        console.log(error)
        throw new Error('PDF docs chunking faild!')
    }
}