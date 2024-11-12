'use client'
import { Participant ,Track} from 'livekit-client'
import React, { useRef, useState } from 'react'
import { useTracks } from '@livekit/components-react'
import FullScreenControll from './FullScreenControll'
import {useEventListener} from 'usehooks-ts'
interface LiveVideoProps{
    Participants:Participant
}
function LiveVideo({Participants}:LiveVideoProps) {
    const VideoRef=useRef<HTMLVideoElement>(null)
    const DivRef=useRef<HTMLDivElement>(null)
    const [isFullScreen,setIsFullScreen]=useState(false)
    useTracks([Track.Source.Camera,Track.Source.Microphone]).filter((track)=>track.participant.identity===Participants.identity)
    .forEach((track)=>{
        if(VideoRef.current){
            track.publication.track?.attach(VideoRef.current)
        }
    })
    const onToggle=()=>{
      if(isFullScreen){
        document.exitFullscreen();
        setIsFullScreen(false);
      }
      else if(DivRef?.current){
        DivRef?.current?.requestFullscreen()
        setIsFullScreen(true)
      }
    }
    const handleFullScreenChange=()=>{
     const  isCurrentlyFullScreen=document.fullscreenElement!== null
     setIsFullScreen(isCurrentlyFullScreen)
    }
    useEventListener("fullscreenchange",handleFullScreenChange,DivRef)
  return (
    <div className='relative h-full flex' ref={DivRef}>
     <video ref={VideoRef} width='100%'/>
     <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
      <div className='absolute bottom-0 flex w-full h-14 item-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
      <FullScreenControll isFullScreen={isFullScreen} onToggle={onToggle}/>
      </div>
     </div>
    </div>
  )
}

export default LiveVideo