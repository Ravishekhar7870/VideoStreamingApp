'use client'

import { useViewerToken } from '@/CustomHooks/useViewerToken'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import { LiveKitRoom} from '@livekit/components-react'
import React from 'react'
import VideoPlayer, { VideoSkelton } from './VideoPlayer'
import { useSelector } from 'react-redux'
import Chat, { ChatSkelton } from './Chat'
import ChatToggle from './Chat-Toggle'
import Header from './Header'
import InfoCard from './InfoCard'
interface StreamPlayerProps{
    user:User,
    stream:Stream,
    isFollowing:boolean
}
function StreamPlayer({user,stream,isFollowing}:StreamPlayerProps) {
    const {token,name,identity} = useViewerToken(user._id)
    const isChatCollpased=useSelector((store:any)=> store.ChatCollapsed.isCollapsed)
   
    if(!token || !name || !identity){
        return (
            <StreamPlayerSkelton/>
        )
    }
    
  return (
   <>
   {isChatCollpased && (
    <div className='hidden lg:block fiexd top-[100px] right-2 z-50'>
      
      <ChatToggle/>
      
    </div>
   )}
   <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
   className={`grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full 
     ${isChatCollpased && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid:cols-2'}`}
   >
    <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 scrollbar-hidden'>
     <VideoPlayer hostname={user.username} hostId={user._id}/>
     <Header
     hostname={user.username}
     hostId={user._id}
     Viewername={name}
     ProfilePic={user.ProfilePic}
     ViewerIdentity={identity}
     isFollowing={isFollowing}
     StreamName={stream.name}
     />
     <InfoCard
     hostId={user._id}
     ViewerIdentity={identity}
     Streamname={stream.name}
     thumbnailUrl={stream.thumbnail}
     />
    </div>
     <div className={`col-span-1 ${isChatCollpased && 'hidden'}`}>
        <Chat
        Viewername={name}
        hostName={user.username}
        hostIdentity={user._id}
        isFollowing={isFollowing}
        isChatEnabled={stream.isChatEnabled}
        isChatFollowerOnly={stream.isChatFollowerOnly}
        isChatSlowed={stream.isChatSlowed}
        />
     </div>
   </LiveKitRoom>
   </>
  )
}
export const StreamPlayerSkelton=()=>{
  return (
    <div className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>
      <div className='space y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
        <VideoSkelton/>
      </div>
      <div className='col-span-1 bg-background'>
        <ChatSkelton/>
      </div>
    </div>
  )
}
export default StreamPlayer