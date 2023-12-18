'use client'

import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'


const queryClient = new QueryClient()



type Props = {
    children: React.ReactNode
}

export default function Provider({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}