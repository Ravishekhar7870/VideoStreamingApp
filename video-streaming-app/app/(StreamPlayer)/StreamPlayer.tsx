'use client'

import { useViewerToken } from '@/CustomHooks/useViewerToken'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import {LiveKitRoom} from '@livekit/components-react'
import React from 'react'
import VideoPlayer from './VideoPlayer'
import { useSelector } from 'react-redux'
interface StreamPlayerProps{
    user:User,
    stream:Stream,
    isFollowing:boolean
}
function StreamPlayer({user,stream,isFollowing}:StreamPlayerProps) {
    const {token,name,identity} = useViewerToken(user._id)
    const isChatCollpased=useSelector((store:any)=> store.ChatCollapsed.isCollapsed)
    console.log("identity",identity)
    if(!token || !name || !identity){
        return (
            <div>Not Allowed to Watch Stream</div>
        )
    }
    
  return (
   <>
   <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
   className={`grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full 
     ${isChatCollpased && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid:cols-2'}`}
   >
    <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 scrollbar-hidden'>
     <VideoPlayer hostname={user.username} hostId={user._id}/>
    </div>
     
   </LiveKitRoom>
   </>
  )
}

export default StreamPlayer