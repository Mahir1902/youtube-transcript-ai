import { get } from "http"
import { getPineconeClient } from "./pinecone-client"
import { getQuestionEmbeddings } from "./getQuestionEmbeddings"



// This function returns the top number of embeddings that match the query embeddings.
// Video link is used to search the correct namespace endsring the search is done on the intended embeddings.
export const getMatchesFromQueryEmbeddings = async (queryEmbeddings:number[], videoLink:string) => {
    const pinecone = getPineconeClient()
    const index = (await pinecone).Index(process.env.PINECONE_INDEX!)

    try {

        const namespace = index.namespace(videoLink)

        const queryResult = await namespace.query({
            topK: 8,
            vector: queryEmbeddings,
            includeMetadata: true,
        })

        return queryResult.matches || []
        
    } catch (error) {
        console.log('error querying embeddings')
        throw error
    }
}

// This funciton is used to get the context which will be passed to the streaming model.
export const getContext = async (query:string, videoLink:string) => {
    const queryEmbeddings = await getQuestionEmbeddings(query)

    const matchtes = await getMatchesFromQueryEmbeddings(queryEmbeddings, videoLink)

    // Return matches that have a score more than 70%
    const qualifyingMatches = matchtes.filter(match => match.score && match.score > 0.7)

    type Metadata = {
        from: number,
        to: number,
        text:string
    }

    let qualifyingDocs = qualifyingMatches.map(match => (match.metadata as Metadata).text)

    return qualifyingDocs.join('\n')
}