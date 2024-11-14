'use client'
import generateHashColor from '@/lib/GetHashColour'
import { ReceivedChatMessage } from '@livekit/components-react'
import {format} from 'date-fns'
import React from 'react'
interface ShowMessageProps{
    data:ReceivedChatMessage
}
function ShowMessage({data}:ShowMessageProps) {
    const color=generateHashColor(data.from?.name || "")
  return (
    <div className='flex gap-2 p-2 rounded-md hover:bg-white/5'>
        <p className='text-sm text-white/40'>
            {format(data.timestamp,"HH:mm")}
        </p>
        <div className='flex flex-wrap items-baseline gap-1 grow'>
         <p className='text-sm font-semibold whitespace-nowrap'>
         <span className='truncate' style={{color:color}}>
           {data.from?.name}
         </span>
         </p>
         <p className='text-sm break-all'>
            {data.message}
         </p>
        </div>
         
    </div>
  )
}

export default ShowMessage