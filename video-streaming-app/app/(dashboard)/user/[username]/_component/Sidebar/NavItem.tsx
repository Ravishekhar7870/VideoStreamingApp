import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { RootState } from '@/Store'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
interface NavItemProps{
    label:string,
    href:string,
    icon:LucideIcon,
    isActive:boolean
}
function NavItem({label,href,icon:Icon,isActive}:NavItemProps) {
    const isCollapsed=useSelector((store:RootState)=> store.DashBoardsidebar.isCollapsed)
  return (
    <Button asChild variant='ghost' className={`w-full h-12 ${isCollapsed ? 'justify-center' : 'justify-start'}
     ${isActive && 'bg-accent'}`}>
    <Link href={href}>
    <div className='flex items-center gap-x-4'>
        <Icon className={`h-4 w-4 ${isCollapsed ? 'mr-0' :'mr-2'} `}/>
        {!isCollapsed && (
            <span>
                {label}
            </span>
        )}
    </div>
    </Link>
    </Button>
  )
}
export const NavItemSkelton=()=>{
    return (
        <li className='flex item-center gap-x-4 px-3 py-2'>
        <Skeleton className='min-h-[48px] min-w-[48px] rounded-md'/>
        <div className='flex-1 hidden lg:block'>
          <Skeleton className='h-6'/>
        </div>
        </li>
    )
}
export default NavItem