'use client'
import { followUser } from '@/Actions/follow.actions'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
interface ActionProps{
    isfollow?:boolean
    id:string
}
function Action({isfollow,id}:ActionProps) {
    const [isPending,startTransition]=useTransition()
    const Onclick=async()=>{
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
  return (
    <Button disabled={isPending || isfollow}  variant='primary' onClick={Onclick}>
        Action
    </Button>
  )
}

export default Action