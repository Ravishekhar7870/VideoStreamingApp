'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users
} from 'lucide-react'
function Navigation() {
    const {user}=useUser();
    const pathname=usePathname()
    const Routes=[
        {
            label:'Stream',
            href:`/user/${user?.username}`,
            icon:Fullscreen
        },
        {
            label:'Keys',
            href:`/user/${user?.username}/Keys`,
            icon:KeyRound
        },
        {
            label:'Chat',
            href:`/user/${user?.username}/Chat`,
            icon:MessageSquare
        },
        {
            label:'Community',
            href:`/user/${user?.username}/Community`,
            icon:Users
        }
    ]
  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
        {
            Routes.map((route)=>(
                <div key={route.href}>
                  {route.label}
                </div>
            ))
        }
    </ul>
  )
}

export default Navigation