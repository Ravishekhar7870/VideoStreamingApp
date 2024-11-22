import React from 'react'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
interface StreamCardwithUser  extends Stream{
   User:User,
   Blocked?:Array<any>
}
interface StreamcardProps{
    data:StreamCardwithUser[]
}
function Streamcard({data}:StreamcardProps) {
  return (
    <div>Streamcard</div>
  )
}

export default Streamcard