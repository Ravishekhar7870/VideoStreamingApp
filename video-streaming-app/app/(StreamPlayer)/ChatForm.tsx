import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { useState } from 'react'
import ChatInfo from './ChatInfo'
interface ChatFormProps{
    onSubmit:()=> void,
    onChange:(value:string)=>void,
    value:string,
    isFollowerOnly?:boolean,
    isSlowed?:boolean,
    isFollowing?:boolean,
    isHidden?:boolean
}
function ChatForm({onSubmit,onChange,value,isFollowerOnly,isSlowed,isFollowing,isHidden}:ChatFormProps) {
    const [isDelayedBlocked,setIsDelayedBlocked]=useState(false);
    const isChatFollowerOnlyandUserisNotFollowing=isFollowerOnly && !isFollowing
    const isDisabled=isDelayedBlocked || isHidden || isChatFollowerOnlyandUserisNotFollowing
    const onSendMessage=(event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      event.stopPropagation();
      if(!value || isDisabled){
        return;
      }
      if(isSlowed && !isDelayedBlocked){
         setIsDelayedBlocked(true);
         setTimeout(() => {
            setIsDelayedBlocked(false)
            onSubmit();
         }, 3000);
      }
      else{
        onSubmit()
      }
    }
    if(isHidden){
        return null;
    }
  return (
    <form onSubmit={onSendMessage} className='flex flex-col item-center gap-y-4 p-3'>
        <div className='w-full'>
          <ChatInfo isFollowersOnly={isFollowerOnly} isSlowed={isSlowed}/>
        <Input onChange={(e)=>onChange(e.target.value)} value={value} placeholder='Send Message' disabled={isDisabled}
        className={`border-white/10 ${isFollowerOnly && 'rounded-t-none border-t-0'}`} 
         />
         </div>
         <div className='ml-auto'>
            <Button variant='primary' type='submit' disabled={isDisabled || isChatFollowerOnlyandUserisNotFollowing} size='sm' >
                Send
                </Button>
         </div>
    </form>
  )
}
export const ChatFormSkelton=()=>{
    return (
        <div className='flex flex-col items-center gap-y-4 p-3'>
         <Skeleton className='w-full h-10'/>
         <div className='flex items-center gap-x-2 ml-auto'>
           <Skeleton className='h-7 w-7'/>
           <Skeleton className='h-7 w-12'/>
         </div>
        </div>
    )
}
export default ChatForm