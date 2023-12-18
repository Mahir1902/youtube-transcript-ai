import { videoLinkSchema } from "@/validators/videoLinkSchema"
import axios from "axios"
import {z} from 'zod'

type Input = z.infer<typeof videoLinkSchema>

export const createChat = async ({videoLink}: Input) => {
    const res = await axios.post('/api/create-chat', {videoLink})
      console.log(res.data)
      return res.data
}