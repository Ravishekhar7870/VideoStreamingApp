'usee client'
import { Switch } from '@/components/ui/switch'
import React from 'react'
type FieldTypes="isChatEnabled" | "isChatSlowed" | "isChatFollowerOnly"
interface ToggleCardProps{
   field:FieldTypes
   label:string
   value?:boolean
}
function ToggleCard({field,label,value}:ToggleCardProps) {
  return (
        <div className='rounded-xl bg-muted p-6'>
        <div className='flex item-center justify-between'>
        <p className=' font-semibold shrink-0'>
           {label}
        </p>
        <div className='space-y-2'>
         <Switch checked={value}>
          {value ?'On' :'Off'}
         </Switch>
        </div>
        </div>
        </div>
  )
}

export default ToggleCard