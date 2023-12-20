'use client'

import {TypeOf, z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { videoLinkSchema } from '@/validators/videoLinkSchema'
import { useMutation } from 'react-query'
import { createChat } from '@/lib/createChat'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react';


type Input = z.infer<typeof videoLinkSchema>

export default function Home() {

  const router = useRouter()

  const form = useForm<z.infer<typeof videoLinkSchema>>({
    resolver: zodResolver(videoLinkSchema),
    defaultValues: {
      videoLink: ''
    }
  })


  const {mutateAsync, isLoading} = useMutation({
    mutationFn:  createChat
  })

  // Could be a server action but try using react query first
  const handleSubmit = (data: Input) => {
    mutateAsync({videoLink: data.videoLink}, {
      onSuccess: ({chat_id}) => {
        console.log(chat_id)
        router.push(`/chat/${chat_id}`)
        toast.success('Chat Created')
      },
      onError: (err) => {
        toast.error('Error creating chat.')
        console.log(err);
        
      }
    })
  }

  form.watch()

  return (
    <div className='absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2'>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField 
              control={form.control} 
              name='videoLink'
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Video Link</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder='e.g. https://youtube.com/watch?v=Deo94kfako'className='hover:border-black'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
              />
              {isLoading ? <Loader2 className='h-5 w-5 text-black animate-spin mt-2'/> : <Button type='submit' className='mt-3'>Submit</Button>}
          </form>
      </Form>
    </div>
  )
}
