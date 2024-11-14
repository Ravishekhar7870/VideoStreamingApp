
import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import ShowMessage from './ShowMessage'
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

export default ChatList