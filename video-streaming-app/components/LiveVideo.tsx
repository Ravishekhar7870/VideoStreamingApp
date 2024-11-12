'use client'
import { Participant ,Track} from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import { useTracks } from '@livekit/components-react'
import FullScreenControll from './FullScreenControll'
import {useEventListener} from 'usehooks-ts'
import VolumeController from './VolumeController'
interface LiveVideoProps{
    Participants:Participant
}
function LiveVideo({Participants}:LiveVideoProps) {
    const VideoRef=useRef<HTMLVideoElement>(null)
    const DivRef=useRef<HTMLDivElement>(null)
    const [isFullScreen,setIsFullScreen]=useState(false)
    const [volume,setvolume]=useState(0)
    useTracks([Track.Source.Camera,Track.Source.Microphone]).filter((track)=>track.participant.identity===Participants.identity)
    .forEach((track)=>{
        if(VideoRef.current){
            track.publication.track?.attach(VideoRef.current)
        }
    })
    const volumeChange=(value:number)=>{
      setvolume(+value)
      if(VideoRef.current){
        VideoRef.current.muted=value===0
        VideoRef.current.volume=+value*0.01
      }
    }
    const toggleMuted=()=>{
     const isMuted=volume===0
     setvolume(isMuted?50:0)
     if(VideoRef.current){
      VideoRef.current.muted=!isMuted
      VideoRef.current.volume=isMuted ? 0.4:0
     }
    }
    useEffect(()=>{
      setvolume(0)
    },[])
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
      <VolumeController onToggle={toggleMuted} onChange={volumeChange} value={volume}/>
      <FullScreenControll isFullScreen={isFullScreen} onToggle={onToggle}/>
      </div>
     </div>
    </div>
  )
}

export default LiveVideo