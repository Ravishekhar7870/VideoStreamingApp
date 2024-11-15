'use client'
import { followUser, Unfollow } from '@/Actions/follow.actions'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
interface ActionsProps{
    hostIdentity:string,
    isFollowing?:boolean, 
    isHost?:boolean
}
function Actions({hostIdentity,isHost,isFollowing}:ActionsProps) {
    const userClerkId=useAuth();
    const router=useRouter();
    const [isPending,startTransition]=useTransition()
    const ToggleFollow=()=>{
        if(!userClerkId){
            toast.error('you are not logged in')
            return router.push('sign-up')
        }
        if(isHost){
            return;
        }
        if(isFollowing){
            // unfollow
            startTransition(()=>{
                Unfollow(hostIdentity)
                .then((res)=>{
                    toast.success(`Unfollowed ${res}`)
                })
                .catch(()=>{
                    toast.error('something went wrong')
                })
            })
        }
        else{
            startTransition(()=>{
                followUser(hostIdentity)
                .then((res)=>{
                    toast.success(`Followed ${res}`)
                })
                .catch(()=>{
                    toast.error('something went wrong')
                })
            })
        }
    }
  return (
    <Button disabled={isPending || isHost} onClick={ToggleFollow} variant='primary' size='sm' className='w-full lg:w-auto'>
        {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default Actions