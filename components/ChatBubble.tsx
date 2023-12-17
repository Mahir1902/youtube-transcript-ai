import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Balancer from 'react-wrap-balancer'
import { cn } from '@/lib/utils'

type Props = {
    role: string
    content: string
}

const wrappedText = (text:string) => {
   return text.split("\n").map((line,i) => (
        <span key={i}>
            {line}
            <br/>
        </span>
    ))
}

export default function ChatBubble({role, content}: Props) {

    if(!content) {
        return null
    }

    const wrappedMessage = wrappedText(content)

  return (
    <div className={cn("mb-2", 
        role == 'assistant' ? 'mr-[20vw]' : 'ml-[20vw]'
    )}>
        <Card className=''>
            <CardHeader>
                <CardTitle className={role != 'assistant' ? 'text-amber-500' : 'text-blue-500'}>
                    {role == 'assistant' ? "AI" : 'You'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Balancer>{wrappedMessage}</Balancer>
            </CardContent>
        </Card>
        
    </div>
  )
}