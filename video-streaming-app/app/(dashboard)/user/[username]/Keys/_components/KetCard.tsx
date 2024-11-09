'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyItem from './CopyItem'
import { Button } from '@/components/ui/button'
interface KeyCardProps{
    value?:string | null
}
function KeyCard({value}:KeyCardProps) {
    const [toShow,setShow]=useState(false);
    const Toggle=()=>{
        setShow(!toShow)
    }
  return (
    <div className='rounded-xl bg-muted p-6'>
     <div className='flex items-start gap-x-10'>
        <p className='font-semibold shrink-0'>
         Stream Key
        </p>
        <div className='space-y-2 w-full'>
            <div className='w-full flex items-center gap-x-2'>
             <Input value={value || ""} disabled type={toShow ? 'text' : 'password'} placeholder='Stream Key'/>
             <CopyItem value={value}/>
            </div>
           <Button variant='link' size='sm' onClick={Toggle}>
            {toShow? "Hide" : "Show"}
           </Button>
        </div>
     </div>
    </div>
  )
}

export default KeyCard