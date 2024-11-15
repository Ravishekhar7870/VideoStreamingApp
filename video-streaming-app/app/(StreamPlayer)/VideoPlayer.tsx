'use client'
import React from 'react'
import { ConnectionState,Track } from 'livekit-client'
import { useConnectionState,useRemoteParticipant,useTracks } from '@livekit/components-react'
import OfflineVideo from './OfflineVideo'
import LoadingVideo from './Loading'
import LiveVideo from './LiveVideo'
import { Skeleton } from '@/components/ui/skeleton'
interface VideoPlayerProps{
    hostname:string,
    hostId:string
}
function VideoPlayer({hostname,hostId}:VideoPlayerProps) {
  
    const connectionstate=useConnectionState();
    const Participants=useRemoteParticipant(JSON.stringify(hostId))
    const tracks=useTracks([
        Track.Source.Camera,
        Track.Source.Microphone

    ]).filter((track)=>track.participant.identity===JSON.stringify(hostId))
    let content;
    
    if(!Participants && connectionstate===ConnectionState.Connected){
        content=<OfflineVideo username={hostname}/>
    }
    else if(!Participants || tracks.length===0){
        content=<LoadingVideo label={connectionstate} />
    }
    else{
        content=<LiveVideo Participants={Participants}/>
    }
  return (
    <div className='aspect-video border-b group relative'>
        {content}
    </div>
  )
}
export const VideoSkelton=()=>{
    return (
        <div className='aspect-video border-x border-background '>
            <Skeleton className='w-full h-full rounded-none'/>
        </div>
    )
}
export default VideoPlayer