'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Error() {
  return (
    <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
        
        <p>
            Something went wrong
        </p>
        <Button asChild variant='primary'>
            <Link href='/'>
            GO BACK
            </Link>
        </Button>

    </div>
  )
}

export default Error