
import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import ShowMessage from './ShowMessage'
import { Skeleton } from '@/components/ui/skeleton'
interface ChatListProps{
    messages:ReceivedChatMessage[],
    isHidden?:boolean
}
function ChatList({messages,isHidden}:ChatListProps) {
    if(isHidden || !messages || messages.length===0){
        return (
            <div className='flex flex=1 items-center justify-center'>
             <p className='text-sm text-muted-foreground'>
                {isHidden ? "Chat is Disabled":"Welcome to the Stream"}
             </p>
            </div>
        )
    }
  return (
    <div className='flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full'>
     {
      messages.map((mess)=>(
        <ShowMessage key={mess.timestamp}  data={mess}/>
      ))
     }
    </div>
  )
} 
export const chatSkelton=()=>{
  return (
    <div className='flex h-full item-center justify-center'>
      <Skeleton className='w-1/2 h-6'/>
    </div>
  )
}

export default ChatList