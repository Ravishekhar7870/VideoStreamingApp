'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import ChatToggle from './Chat-Toggle'

function ChatHeader() {
  return (
    <div className='relative p-3 border-b'>
        <div className='absolute top-2 left-2 hidden lg:block'>
        <ChatToggle/>
        </div>
      <p className='font-semibold text-primary text-center'>
        Chat
      </p>
    </div>
  )
}
export const ChatHeaderSkelton=()=>{
    return (
        <div className='relative p-3 border-b hidden md:block'>
            <Skeleton className='absolute h-6 w-6 left-3 top-3'/>
            <Skeleton className='w-26 h-6 mx-auto'/>
        </div>
    )
}

export default ChatHeader