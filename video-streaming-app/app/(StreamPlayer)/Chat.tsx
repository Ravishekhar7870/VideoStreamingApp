import { ChatCollapsedSliceActions } from '@/Store/ChatCollapsedSlice';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
interface ChatProps{
    Viewername?:string,
    hostName?:string,
    hostIdentity?:string,
    isFollowing?:boolean,
    isChatEnabled?:boolean,
    isChatFollowerOnly?:boolean,
    isChatSlowed?:boolean
}
function Chat({Viewername,hostName,hostIdentity,isFollowing,isChatEnabled,isChatFollowerOnly,isChatSlowed}:ChatProps) {
    const connectionState=useConnectionState();
    const Participants=useRemoteParticipant(JSON.stringify(hostIdentity))
    const isChatCollpased=useSelector((store:any)=> store.ChatCollapsed.isCollapsed)
    const dispatch=useDispatch();
    const isOnline=Participants && connectionState===ConnectionState.Connected
    const isHidden=!isChatEnabled || !isOnline
    const {chatMessages,send}=useChat()
    const [Value,setValue]=useState("")
    useEffect(() => {
      const handleResize = () => {
        if (!isChatCollpased && window.innerWidth <= 640) {
          dispatch(ChatCollapsedSliceActions.setCollapseAsTrue());
        }
      };
  
    
      handleResize();
  
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isChatCollpased, dispatch]);
    const OnSubmit=()=>{
        if(!send){
            return;
        }
        setValue("")
        send(Value)
    }
    const OnChange=(value:string)=>{
        setValue(value)
    }
  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
       <ChatHeader/>
    </div>
  )
}

export default Chat