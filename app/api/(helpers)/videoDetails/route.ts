import axios from "axios";
import { NextResponse } from "next/server";


// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=G1hqsr5mkzA&key=[YOUR_API_KEY]



// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

const base_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=`


export const POST = async (req: Request) => {

    const {videoId} = await req.json()


    const apiKey = process.env.YOUTUBE_API
     
    const url = `${base_url + videoId}&key=${apiKey}`

    const {data} = await axios.get(url)

    const videoDetails = data.items[0].snippet

    // return {
    //     title: videoDetails.title,
    //     description: videoDetails.description,
    //     thumbnails: videoDetails.thumbnails, //this is an object of thumbnails
    //     channelTitle: videoDetails.channelTitle,
    // }

    return NextResponse.json({
        title: videoDetails.title,
        description: videoDetails.description,
        thumbnails: videoDetails.thumbnails, //this is an object of thumbnails
        channelTitle: videoDetails.channelTitle,
    })

    // console.log(videoDetails.title)


    // const res = await axios.get(`${base_url + videoId}`)
} 