'use client'

import React from 'react'
import {Message} from 'ai/react'
import ChatBubble from './ChatBubble'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useChat } from 'ai/react'
import MessagesList from './MessagesList'
import { DrizzleChat } from '@/lib/db/schema'
import Image from 'next/image'
import { useQuery } from 'react-query'
import axios from 'axios'


type Props = {
    chatId:number
    chats: DrizzleChat[],
}

export default function ChatCompoent({chatId, chats}: Props) {

    const {data} = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const res = await axios.post<Message[]>(`http://localhost:3000/api/get-messages`, {chatId})
            return res.data
        }
    })

    
    

    const {handleSubmit, input, handleInputChange, messages} = useChat({
        body: {
            chatId
        },
        initialMessages: data || []
    })

    const chat = chats.find((chat) => chat.id === chatId)

    const thumbnail = chat?.thumbnailUrl


  return (
    
    <div className='relative h-full flex flex-col'>
        <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit flex justify-between'>
            <h3 className='text-xl font-bold'>Chat</h3>
            <Image alt='' src={thumbnail!} width={120} height={90} className='rounded-xl mr-6 '/>
        </div>
        <div className=' w-full h-full overflow-scroll flex flex-col items-center'>
        
            
            
            <MessagesList messages={messages}/>
        </div>
        <form className='p-4 flex clear-both' onSubmit={handleSubmit}>
             <Input value={input} onChange={handleInputChange} placeholder='Type to chat with video.' className='mr-2'/>

             <Button>Ask</Button>
         </form>
    </div>
  )
}