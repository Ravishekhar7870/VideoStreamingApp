'use client'
import { Participant ,Track} from 'livekit-client'
import React, { useRef } from 'react'
import { useTracks } from '@livekit/components-react'
interface LiveVideoProps{
    Participants:Participant
}
function LiveVideo({Participants}:LiveVideoProps) {
    const VideoRef=useRef<HTMLVideoElement>(null)
    const DivRef=useRef<HTMLDivElement>(null)
    useTracks([Track.Source.Camera,Track.Source.Microphone]).filter((track)=>track.participant.identity===Participants.identity)
    .forEach((track)=>{
        if(VideoRef.current){
            track.publication.track?.attach(VideoRef.current)
        }
    })
  return (
    <div className='relative h-full flex' ref={DivRef}>
     <video ref={VideoRef} width='100%'/>
    </div>
  )
}

export default LiveVideo