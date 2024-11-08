'use client'
import { UpdateUserStreamAction } from '@/Actions/Stream.actions'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
type FieldTypes="isChatEnabled" | "isChatSlowed" | "isChatFollowerOnly"
interface ToggleCardProps{
   field:FieldTypes
   label:string
   value?:boolean
}
function ToggleCard({field,label,value}:ToggleCardProps) {
    const [isPending,startTransition]=useTransition()
    const OnChange=()=>{
      startTransition(()=>{
        UpdateUserStreamAction({[field]:!value})
        .then(()=>{
            toast.success('chat setting changed')
        })
        .catch(()=>{
            toast.error("Something Went Wrong")
        })
      })
    }
  return (
        <div className='rounded-xl bg-muted p-6'>
        <div className='flex item-center justify-between'>
        <p className=' font-semibold shrink-0'>
           {label}
        </p>
        <div className='space-y-2'>
         <Switch checked={value} onCheckedChange={OnChange} disabled={isPending}>
          {value ?'On' :'Off'}
         </Switch>
        </div>
        </div>
        </div>
  )
}
export const ToggleCardSkelton=()=>{
    return (
        <Skeleton className='rounded-xl p-10 w-full'/>
    )
}

export default ToggleCard