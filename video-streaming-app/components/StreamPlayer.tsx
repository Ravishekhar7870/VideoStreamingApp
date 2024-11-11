'use client'

import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import React from 'react'
interface StreamPlayerProps{
    user:User,
    stream:Stream,
    isFollowing:boolean
}
function StreamPlayer({user,stream,isFollowing}:StreamPlayerProps) {
  return (
    <div>StreamPlayer</div>
  )
}

export default StreamPlayer