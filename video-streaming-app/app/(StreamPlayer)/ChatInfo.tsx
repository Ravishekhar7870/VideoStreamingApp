import { Info } from 'lucide-react'
import React, { useMemo } from 'react'
interface ChatInfoProps{
    isSlowed?:boolean,
    isFollowersOnly?:boolean
}
function ChatInfo({isSlowed,isFollowersOnly}:ChatInfoProps) {
    const label=useMemo(()=>{
       if(isSlowed && !isFollowersOnly){
        return "Chat is Slowed"
       }
       if(isFollowersOnly && !isSlowed){
        return "Chat is Follower only"
       }
       if(isFollowersOnly && isSlowed){
        return "Chat is Follower only.Chat is Slowed"
       }
    },[isFollowersOnly,isSlowed])
    if(!isSlowed && !isFollowersOnly){
        return null;
    }
  return (
    <div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
        <Info/>
     <p className='text-xs font-semibold'>
        {label}
     </p>
    </div>
  )
}

export default ChatInfo