'use client'
import ChannelAvatar from '@/components/Avatar'
import { Avatar } from '@/components/ui/avatar'
import React from 'react'
interface HeaderProps{
    hostname:string
     hostId?:string
     Viewername?:string
     ProfilePic?:string
     ViewerId?:string
     isFollowing:boolean
     StreamName?:string
}
function Header({hostname,hostId,ViewerId,Viewername,ProfilePic,isFollowing,StreamName}:HeaderProps) {
  return (
    <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
        <div className='flex items-center gap-x-3'>
        <ChannelAvatar imageUrl={ProfilePic} islive={true} username={hostname} />
        <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>
                {hostname}
            </h2>
            </div>

        </div>
        </div>

    </div>
  )
}

export default Header