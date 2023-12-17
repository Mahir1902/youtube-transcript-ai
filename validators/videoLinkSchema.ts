import {z} from 'zod'

export const videoLinkSchema = z.object({
    videoLink: z.string().startsWith('http', {message: 'Please provide valid link'})
  })