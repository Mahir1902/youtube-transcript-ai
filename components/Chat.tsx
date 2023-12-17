import React from 'react'
import {Message} from 'ai/react'
import ChatBubble from './ChatBubble'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Props = {}

export default function Chat({}: Props) {

    const messages: Message[] = [
        {role: 'assistant', content: 'Hey AI here', id:"1"},
        {role: 'user', content: 'Hey me here', id:"2"},
    ]


  return (
    <div className='rounded-2xl border h-[75vh] flex flex-col justify-between bg-red'>
        <div className='p-6 overflow-auto '>
            {messages.map(({id, role, content}:Message, index) => (
                <ChatBubble key={id} role={role} content={content}/>
            ))}
        </div>

        <form className='p-4 flex clear-both'>
            <Input placeholder='Type to chat with AI' className='mr-2'/>

            <Button>Ask</Button>
        </form>
    </div>
  )
}