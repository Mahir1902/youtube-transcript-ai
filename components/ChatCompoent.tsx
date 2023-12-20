'use client'

import React from 'react'
import {Message} from 'ai/react'
import ChatBubble from './ChatBubble'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useChat } from 'ai/react'
import MessagesList from './MessagesList'

type Props = {
    chatId:number
}

export default function ChatCompoent({chatId}: Props) {

    const {handleSubmit, input, handleInputChange, messages} = useChat({
        body: {
            chatId
        }
    })

    


  return (
    
    <div className='relative h-full flex flex-col'>
        <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit'>
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>
        <div className=' w-full h-full overflow-scroll'>
            <MessagesList messages={messages}/>
        </div>
        <form className='p-4 flex clear-both' onSubmit={handleSubmit}>
             <Input value={input} onChange={handleInputChange} placeholder='Type to chat with AI' className='mr-2'/>

             <Button>Ask</Button>
         </form>
    </div>
  )
}