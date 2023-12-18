'use client'

import React from 'react'
import {Message} from 'ai/react'
import ChatBubble from './ChatBubble'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useChat } from 'ai/react'
import MessagesList from './MessagesList'

type Props = {}

export default function ChatCompoent({}: Props) {

    const {handleSubmit, input, handleInputChange, messages} = useChat()

    // const messages: Message[] = [
    //     {role: 'assistant', content: 'Hey AI here', id:"1"},
    //     {role: 'user', content: 'Hey me here', id:"2"},
    // ]


  return (
    // <div className='rounded-2xl border h-[75vh] flex flex-col justify-between bg-red h-full'>
    //     <div className='p-6 overflow-auto '>
    //         {messages.map(({id, role, content}:Message, index) => (
    //             <ChatBubble key={id} role={role} content={content}/>
    //         ))}
    //     </div>
//     <form className='p-4 flex clear-both'>
//     <Input placeholder='Type to chat with AI' className='mr-2'/>

//     <Button>Ask</Button>
// </form>
    //     
    // </div>

    <div className='relative h-full flex flex-col'>
        <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit'>
            <h3 className='text-xl font-bold'>Chat</h3>
        </div>
        <div className='w-full h-full overflow-scroll'>
            <MessagesList messages={messages}/>
        </div>
        <form className='p-4 flex clear-both' onSubmit={handleSubmit}>
             <Input value={input} onChange={handleInputChange} placeholder='Type to chat with AI' className='mr-2'/>

             <Button>Ask</Button>
         </form>
    </div>
  )
}