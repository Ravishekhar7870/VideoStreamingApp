'use client'
import {  UnBlockUserAction } from '@/Actions/Blocked.actions'
import { followUser, Unfollow } from '@/Actions/follow.actions'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
interface ActionProps{
    isfollow?:boolean
    id:string
    isLoggedin?:boolean
}
function Action({isfollow,id,isLoggedin}:ActionProps) {
    const [isPending,startTransition]=useTransition()
    const OnFollow=async()=>{
        startTransition(()=>{
            followUser(id)
            .then((data)=>{
                toast.success(`You are now following ${data}`)
            })
            .catch(()=>{
                toast.error("Couldn't follow the User")
            })
        })
      
    }
    const onUnfollow=async()=>{
        startTransition(()=>{
            Unfollow(id)
            .then((data)=>{
                toast.success(`You have Unfollowed ${data}`)
            })
            .catch(()=>{
                toast.error("Couldn't Unfollow the User")
            })
        })
    }
    const Onclick=()=>{
        if(isfollow){
            onUnfollow()
        }
        else{
            OnFollow();
        }
    }
    const onBlock=()=>{
        startTransition(()=>{
            UnBlockUserAction(id)
            .then((data)=>{
                toast.success(`Successfully blocked ${data}`)
            })
            .catch(()=>{
                toast.error('something went wrong')
            })
        })
    }
  return (
    <>
    <Button disabled={isPending || !isLoggedin }  variant='primary' onClick={Onclick}>
        {isfollow? "Unfollow":"Follow"}
    </Button>
    <Button disabled={isPending || !isLoggedin} onClick={onBlock}>
        UnBlock
    </Button>
    </>
  )
}

export default Action