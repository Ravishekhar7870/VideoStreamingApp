'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'



import { ChatCollapsedSliceActions } from '@/Store/ChatCollapsedSlice'
function ChatToggle() {
    const isChatCollpased=useSelector((store:any)=> store.ChatCollapsed.isCollapsed)
    const dispatch=useDispatch();
    
    const handleArrowClick=()=>{
      dispatch(ChatCollapsedSliceActions.ChangeState());
    }
    
  return (
   <Button
   size='sm'
   variant='ghost'
    className='h-auto p-2 ml-auto hidden sm:block'>
      {isChatCollpased ? (
                <ArrowRightFromLine className='h-4 w-4' onClick={handleArrowClick} />
            ) : (
                <ArrowLeftFromLine className='h-4 w-4' onClick={handleArrowClick}/>
            )}
   </Button>
  )
}

export default ChatToggle