import { OpenAIEmbeddings } from "langchain/embeddings/openai";



export const getQuestionEmbeddings = async (question:string) => {
    const embeddings = new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API}).embedQuery(question)

    return embeddings
}