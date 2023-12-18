import ChatComponent from '@/components/ChatCompoent'
import ChatSideBar from '@/components/ChatSideBar'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'

import { redirect } from 'next/navigation'
import React from 'react'


type Props = {
    params:{
      chat_id: string
    }
}



export default async function page({params: {chat_id}}: Props) {

  
  const _chats = await db.select().from(chats)

  

  if(!_chats.find(chat => chat.id === parseInt(chat_id))) {
    return redirect('/')
  }

  
  // console.log(_chats)


  return (
    // <div className='reletive container flex min-h-screen flex-col'>
    //   <Chat/>
    // </div>
    
    <div className='flex max-h-screen '>
      <div className='flex w-full max-h-screen'>
          <div className='flex-[2] max-w-sm'>
              <ChatSideBar chats={_chats} chatId={parseInt(chat_id)}/>
              
          </div>
          <div className='w-full'>
          <ChatComponent/>
          </div>
      </div>
    </div>
    
  )
}