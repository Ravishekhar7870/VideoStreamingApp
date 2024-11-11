'use client'

import { useViewerToken } from '@/CustomHooks/useViewerToken'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import React from 'react'
interface StreamPlayerProps{
    user:User,
    stream:Stream,
    isFollowing:boolean
}
function StreamPlayer({user,stream,isFollowing}:StreamPlayerProps) {
    const {token,name,identity} = useViewerToken(user._id)
    if(!token || !name || !identity){
        return (
            <div>Not Allowed to Watch Stream</div>
        )
    }
  return (
    <div>StreamPlayer</div>
  )
}

export default StreamPlayer