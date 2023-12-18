import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'

type Props = {
  messages: Message[]
}

export default function MessagesList({messages}: Props) {

  if(!messages) return <></>



  return (
    <div className='flex flex-col gap-2 px-4'>
        {messages.map(messages => (
          <div
          key={messages.id}
          className={cn('flex', {
            'justify-end': messages.role === 'user',
            'justify-start': messages.role === 'assistant'
          })}
          >
            <div className={cn('rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10', {
              'bg-black text-white': messages.role === 'user'
            })}>

            <p>{messages.content}</p>
            </div>
          </div>
        ))}
    </div>
  )
}