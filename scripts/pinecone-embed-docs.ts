import { textSplitter } from "@/lib/textSplitter";
import { embedAndStoreDocs } from "@/lib/embedAndStore";
import { getPineconeClient } from "@/lib/pinecone-client";
import axios from "axios";


// export const embedPinecone = async () => {

//     const {videoLink, text} = await axios.post('api/')

//     const pineconeClient = await getPineconeClient()
//     console.log('Preparing chunks')
//     const docs = await textSplitter(text)
//     console.log(`Loading ${docs.length} chunks into pinecone`)
//     await embedAndStoreDocs(pineconeClient, docs)
//     console.log("Data embedded and stored in pine-cone index")
// } 