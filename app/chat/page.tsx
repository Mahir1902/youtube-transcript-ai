import Chat from '@/components/Chat'
import React from 'react'
import Balancer from 'react-wrap-balancer'

type Props = {
    
}



export default function page({}: Props) {
  return (
    <div className='reletive container flex min-h-screen flex-col'>
      <Chat/>
    </div>
  )
}