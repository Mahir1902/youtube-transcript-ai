import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    chats: DrizzleChat[],
    chatId: number
}

export default function ChatSideBar({chats, chatId}: Props) {
  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
        <Link href='/'>
            <Button className='w-full border-white border border-dashed'>
                <PlusCircle className='mr-2 w-4 h-4'/>
                New Chat
            </Button>
        </Link>

        <div className='flex flex-col gap-2 mt-4'>
            {chats.map(chat => (
                <Link key={chat.id} href={`/chats/${chat.id}`}>
                    <div className={cn('rounded-lg p-3 text-slate-300 flex items-center', {'bg-blue-900 text-white' : chat.id === chatId, 'hover:bg-white/10': chat.id !== chatId} )}>
                        <MessageCircle className='mr-2'/>
                        <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.videoUrl}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}