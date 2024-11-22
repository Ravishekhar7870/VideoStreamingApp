'use client'
import { BlockUserAction } from '@/Actions/Blocked.actions'
import { Button } from '@/components/ui/button'
import generateHashColor from '@/lib/GetHashColour'
import { MinusCircle } from 'lucide-react'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
import HoverHint from '@/components/HoverHint';
interface CommunityItemProps{
    Viewername?:string,
    hostName?:string,
    ParticipantName?:string,
    ParticipantIdentity:string
}
function CommunityItem({Viewername,hostName,ParticipantName,ParticipantIdentity}:CommunityItemProps) {
    const color=generateHashColor(ParticipantName || " ")
    const [isPending,startTransition]=useTransition()
    const self=Viewername===ParticipantName
    const host=hostName===Viewername
    const BlockUser=()=>{
        startTransition(()=>{
            if( !host || !ParticipantIdentity || !ParticipantName || self){
                return;
            }
            BlockUserAction(ParticipantIdentity)
            .then(()=>{
                toast.success(`Sucessfully kicked out the user`)
            })
            .catch(()=>{
                toast.error('something went wrong')
            })
        })
    }
  return (
    <div className={`group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5 ${isPending && 'opacity-50 pointer-events-none'} `}>
        <p style={{color:color}}>
            {ParticipantName}
        </p>
        {
            host && !self && (
                <HoverHint hintText='Block' >
                <Button className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition' onClick={BlockUser} disabled={isPending} >
                  <MinusCircle className='h-4 w-4 text-muted-foreground'/>
                </Button>
                </HoverHint>
            )
            }
    </div>
  )
}

export default CommunityItem