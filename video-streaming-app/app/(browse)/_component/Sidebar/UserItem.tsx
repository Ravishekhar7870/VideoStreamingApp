import React from 'react'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import ChannelAvatar from '@/components/Avatar'
import { RootState } from '@/Store'
interface UserItemProps{
    username:string
    imageUrl?:string
    isLive?:boolean
}
function UserItem({username,isLive,imageUrl}:UserItemProps) {
     const pathname=usePathname();
     const isCollapsed=useSelector((store:RootState)=> store.sidebar.isCollapsed)
     const href=`/${username}`
     const iswatching=pathname===href
  return (
    <Button
    asChild
    variant='ghost'
    className={`w-full h-13 ${isCollapsed ? 'justify-center':'justify-start'} ${iswatching && 'bg-accent'}`}
    >
     <Link href={href}>
     <div className={`flex items-center w-full gap-x-4 ${isCollapsed && 'justify-center'}` }>
      <ChannelAvatar
      username={username}
      imageUrl={imageUrl}
      islive={isLive}
      />
      {!isCollapsed && (
        <p className='truncate'>
            {username}
        </p>
      )}
     </div>
     </Link>
    </Button>
  )
}
export const UserItemSkelton=()=>{
    return (
        <li className='flex items-center gap-x-4 px-3 py-2'>
            <Skeleton className='min-h-[32px] min-w-[32px] rounded-full'/>
            <div className='flex-1'>
             <Skeleton className='h-6'/>
            </div>
        </li>
    )
}
export default UserItem