import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
async function Action() {
    const user=await currentUser();
  return (
    <div className='flex item-center justify-end gap-x-2 ml-4 lg:ml-0'>
     {!user && (<SignInButton>
            <Button>
                Login
            </Button>
        </SignInButton>)}
     {
        !!user && (
            <div>
                <Button
                size='sm'
                variant='ghost'
                className='text-muted-foreground hover:text-primary'
                asChild
                >
                   <Link href={`/u/${user.username}`}>
                   <Clapperboard className='h-7 w-7 lg:mr-3'/>
                   </Link> 
                </Button>
                <UserButton afterSignOutUrl='/'/>
            </div>
        ) 
     }
    </div>
  )
}

export default Action