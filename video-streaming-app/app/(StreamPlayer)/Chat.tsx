import React from 'react'
interface ChatProps{
    name?:string,
    hostName?:string,
    hostIdentity?:string,
    isFollowing?:boolean,
    isChatEnabled?:boolean,
    isChatFollowerOnly?:boolean,
    isChatSlowed?:boolean
}
function Chat({name,hostName,hostIdentity,isFollowing,isChatEnabled,isChatFollowerOnly,isChatSlowed}:ChatProps) {
  return (
    <div>Chat</div>
  )
}

export default Chat