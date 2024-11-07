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
import NavItem, { NavItemSkelton } from './NavItem'
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
    if(!user?.username){
        return (
            <ul className='space-y-2'>
             {
                [...Array(4)].map((_,i)=>(
                    <NavItemSkelton key={i}/>
                ))
             }
            </ul>
        )
    }
  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
        {
            Routes.map((route)=>(
                <NavItem key={route.href}
                  label={route.label}
                  href={route.href}
                  icon={route.icon}
                  isActive={pathname===route.href}
                />
            ))
        }
    </ul>
  )
}

export default Navigation