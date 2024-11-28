import { UnBlockUserAction } from '@/Actions/Blocked.actions';
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner';
interface UnblockButtonProps{
    userId:string,
}
function UnblockButton({userId}:UnblockButtonProps) {
    const [isPending,startTransition]=useTransition();
    const onUnblock=()=>{
        startTransition(()=>{
            UnBlockUserAction(userId)
            .then((res)=>{
               toast.success(`Unblocked ${res}`)
            })
            .catch(()=>{
                toast.error('Something  went wrong')
            })
        })
    }
  return (
    <Button variant='primary' disabled={isPending} onClick={onUnblock}>
        Unblock
    </Button>
  )
}

export default UnblockButton