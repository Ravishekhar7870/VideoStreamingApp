'use client'
import { User } from '@/Model/User.mode'
import React from 'react'
import { useSelector } from 'react-redux'
interface Followed{
    id:string,
    Channel:User
}
interface followList{
    data:(Followed)[]
}
function FollowedList({data}:followList) {
    const isCollapsed=useSelector((store:any)=>store.sidebar.isCollapsed);
    if(data.length<1){
        return null;
    }
   
  return (

    <div>
        {
            !isCollapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>
                 </div>
            )
        }

    </div>
  )
}

export default FollowedList