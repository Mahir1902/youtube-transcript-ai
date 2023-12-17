'use client'

import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { videoLinkSchema } from '@/validators/videoLinkSchema'



export default function Home() {

  const form = useForm<z.infer<typeof videoLinkSchema>>({
    resolver: zodResolver(videoLinkSchema),
    defaultValues: {
      videoLink: ''
    }
  })


  

  // Could be a server action but try using react query first
  const handleSubmit = () => {}


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
                        <Input placeholder='e.g. youtube.com/watch?v=Deo94kfako'className='hover:border-black'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
              />
              <Button type='submit' className='mt-3'>Submit</Button>
          </form>
      </Form>
    </div>
  )
}
