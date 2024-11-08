import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToggleCardSkelton } from './_components/ToggleCard'

function loading() {
  return (
    <div className='p-6 space-y-4'>
        <Skeleton className='h-10 w-[200px]'/>
        <div className='space-y-4'>
          <ToggleCardSkelton/>
          <ToggleCardSkelton/>
          <ToggleCardSkelton/>
        </div>
        </div>
  )
}

export default loading