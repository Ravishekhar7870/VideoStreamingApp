'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users
} from 'lucide-react'
import NavItem, { NavItemSkelton } from './NavItem'
interface NavigationProps{
    username?:string
}
function Navigation({username}:NavigationProps) {
   
    const pathname=usePathname()
    const Routes=[
        {
            label:'Stream',
            href:`/user/${username}`,
            icon:Fullscreen
        },
        {
            label:'Keys',
            href:`/user/${username}/Keys`,
            icon:KeyRound
        },
        {
            label:'Chat',
            href:`/user/${username}/Chat`,
            icon:MessageSquare
        },
        {
            label:'Community',
            href:`/user/${username}/Community`,
            icon:Users
        }
    ]
    if(!username){
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