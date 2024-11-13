import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
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
    <div>ChatList</div>
  )
}

export default ChatList