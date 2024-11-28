import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
        <h1 className='text-4xl'>
            404
        </h1>
        <p>
            Could not find the Page
        </p>
        <Button asChild variant='primary'>
            <Link href='/'>
            GO BACK
            </Link>
        </Button>

    </div>
  )
}

export default notFound