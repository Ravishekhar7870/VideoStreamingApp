'use client'
import ChannelAvatar from '@/components/Avatar'

import { useParticipants, useRemoteParticipant } from '@livekit/components-react'
import { UserIcon } from 'lucide-react'
import React from 'react'
import Actions from './Actions'
interface HeaderProps{
    hostname:string
     hostId:string
     Viewername?:string
     ProfilePic?:string
     ViewerIdentity?:string
     isFollowing:boolean
     StreamName?:string
}
function Header({hostname,hostId,ViewerIdentity,ProfilePic,isFollowing,StreamName}:HeaderProps) {
    const Participants=useParticipants()
    const hostasParticipant=useRemoteParticipant(JSON.stringify(hostId))
    const isLive=!!hostasParticipant
    const hostAsViewer=`self${String(hostId)}`
    
    const isHost=JSON.stringify(ViewerIdentity)===JSON.stringify(hostAsViewer)
    const LiveViewer=Participants.length-1;
   
  return (
    <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
        <div className='flex items-center gap-x-3'>
        <ChannelAvatar imageUrl={ProfilePic} islive={isLive} username={hostname} />
        <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>
                {hostname}
            </h2>
            </div>
            <p className='text-sm font-semibold'>
                {StreamName}
            </p>
            {isLive && (
                <div className='font-semibold flex gap-x-1 items-center text-xs text-rose-500'>
                    <UserIcon className='h-4 w-4'/>
                    <p>
                        {LiveViewer} {LiveViewer===1 ? "Viewer" :"Viewers"}
                    </p>
                </div>
                

            )}

        </div>
        <Actions hostIdentity={hostId} isFollowing={isFollowing} isHost={isHost} />
        </div>

    </div>
  )
}

export default Header