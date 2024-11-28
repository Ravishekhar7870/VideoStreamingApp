'use client'

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParticipants } from '@livekit/components-react';
import React, { useMemo, useState } from 'react'

import CommunityItem from './CommunityItem';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

interface ChatCommunityProps{
    Viewername?:string,
    hostName?:string,
    isHidden?:boolean
}
function ChatCommunity({Viewername,hostName,isHidden}:ChatCommunityProps) {
    const [value,setValue]=useState("");
  
    const Participants=useParticipants();
    const onChange=(newValue:string)=>{
        setValue(newValue)
    }
    const filteredParticipants=useMemo(()=>{
        const deduped=Participants.reduce((acc,partcipants)=>{
            const hostAsViewwer=`self${String(partcipants.identity)}`
            if(!acc.some((p)=> JSON.stringify(p.identity)===JSON.stringify(hostAsViewwer))){
                acc.push(partcipants)
            }
            return acc;
        } ,[] as (RemoteParticipant | LocalParticipant)[] )
        return deduped.filter((participant)=>{
            return participant?.name?.toLowerCase().includes(value.toLowerCase());
        })
    },[Participants,value])
    if(isHidden){
        return (
            <div className='flex flex-1 items-center justify-center'>
                <p className='text-sm text-muted-foreground'>
                    Commuity Tab is Hidden
                </p>
            </div>
        )
    }
   
  return (
    <div className='p-4'>
     <Input className='border-white/10' placeholder='Search Community' onChange={(e)=> onChange(e.target.value)}/>
     <ScrollArea className='gap-y-4 mt-4'>
      <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
        No results
      </p>
      {
        filteredParticipants.map((participants)=>(
            <CommunityItem
             key={participants.identity}
             Viewername={Viewername}
             hostName={hostName}
             ParticipantName={participants.name}
             ParticipantIdentity={participants.identity}
            />
        ))
      }
     </ScrollArea>
    </div>
  )
}

export default ChatCommunity