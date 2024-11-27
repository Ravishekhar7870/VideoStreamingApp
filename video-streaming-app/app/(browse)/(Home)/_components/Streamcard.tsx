import React from 'react'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import Link from 'next/link'
interface StreamCardwithUser  extends Stream{
   User:User,
   Blocked?:Array<any>
}
interface StreamcardProps{
    data:StreamCardwithUser
}
function Streamcard({data}:StreamcardProps) {
  return (
    <Link href={`/${data.User.username}`}>
   <div className='h-full w-full space-y-4'>
    Stream card
   </div>
   </Link>
  )
}

export default Streamcard