'use client'
import React from 'react'
import { ConnectionState,Track } from 'livekit-client'
import { useConnectionState,useRemoteParticipant,useTracks } from '@livekit/components-react'
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
        content=<p>Host is Offline</p>
    }
    else if(!Participants || tracks.length===0){
        content=<p>...Loading</p>
    }
    else{
        content=<p>Live Video</p>
    }
  return (
    <div className='aspect-video border-b group relative'>
        {content}
    </div>
  )
}

export default VideoPlayer