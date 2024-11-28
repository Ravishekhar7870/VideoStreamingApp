import { ChatCollapsedSliceActions, ChatVariant } from '@/Store/ChatCollapsedSlice';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader, { ChatHeaderSkelton } from './ChatHeader';
import ChatForm, { ChatFormSkelton } from './ChatForm';
import ChatList from './ChatList';
import ChatCommunity from './ChatCommunity';
import {ChatListSkelton} from './ChatList'
import { RootState } from '@/Store';
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
    const {isCollapsed,variant}=useSelector((store:RootState)=> store.ChatCollapsed)
    const dispatch=useDispatch();
    const isOnline=Participants && connectionState===ConnectionState.Connected
    const isHidden=!isChatEnabled || !isOnline
    const {chatMessages,send}=useChat()
    const [Value,setValue]=useState("")
    useEffect(() => {
      const handleResize = () => {
        if (!isCollapsed && window.innerWidth <= 640) {
          dispatch(ChatCollapsedSliceActions.setCollapseAsTrue());
        }
      };
  
    
      handleResize();
  
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed, dispatch]);
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
    const sortedMessages=useMemo(()=>{
        return chatMessages.sort((a,b)=> b.timestamp-a.timestamp)
    },[chatMessages])
  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
       <ChatHeader/>
       {
        variant===ChatVariant.CHAT && (
            <>
            <ChatList messages={sortedMessages} isHidden={isHidden}/>
             <ChatForm onSubmit={OnSubmit} onChange={OnChange} value={Value} isFollowerOnly={isChatFollowerOnly}
             isSlowed={isChatSlowed} isFollowing={isFollowing} isHidden={isHidden}
             />
            </>
        )
       }
       {
        variant===ChatVariant.COMMUNITY && (
            <>
            <ChatCommunity Viewername={Viewername} hostName={hostName} isHidden={isHidden} />
            </>
        )
       }
    </div>
  )
}
export const ChatSkelton=()=>{
  return (
    <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-8opx)] border-2'>
      <ChatHeaderSkelton/>
      <ChatListSkelton/>
      <ChatFormSkelton/>
    </div>
  )
}
export default Chat