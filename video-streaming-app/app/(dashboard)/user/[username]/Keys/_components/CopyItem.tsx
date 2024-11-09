'use client'
import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react';
import React, { useState } from 'react'
interface CopyItemProps{
    value?:string | null
}
function CopyItem({value}:CopyItemProps) {
    const [isCopied,setiscopied]=useState(false);
    const onClick=()=>{
        if(!value){
            return;
        }
        setiscopied(true);
        navigator.clipboard.writeText(value)
        setTimeout(()=>{
         setiscopied(false)
        },1000)
    }
    const Icon=isCopied ? CheckCheck :Copy
  return (
     <Button onClick={onClick} variant='ghost' size='sm' disabled={!value || isCopied}>
      <Icon className='h-4 w-4'/>
     </Button>
  )
}

export default CopyItem