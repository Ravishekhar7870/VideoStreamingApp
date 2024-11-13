'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'



import { ChatCollapsedSliceActions, ChatVariant } from '@/Store/ChatCollapsedSlice'
function ChatVariantToggle() {
    const variant=useSelector((store:any)=> store.ChatCollapsed.variant)
    const dispatch=useDispatch();
    const isChat=variant===ChatVariant.CHAT
    const Icon=isChat ? Users:MessageSquare
    const handleArrowClick=()=>{
        const newvariant=isChat? ChatVariant.COMMUNITY:ChatVariant.CHAT
      dispatch(ChatCollapsedSliceActions.onVariantChange({chatVariant:newvariant}));
    }
    
  return (
   <Button
   size='sm'
   variant='ghost'
    className='h-auto p-2 ml-auto hidden sm:block'>
      <Icon className='h-4 w-4' onClick={handleArrowClick}/>
   </Button>
  )
}

export default ChatVariantToggle