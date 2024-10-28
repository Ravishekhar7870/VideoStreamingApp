'use client'
import { User } from '@/Model/User.mode';
import React from 'react'
import { useSelector } from 'react-redux';
interface RecommendedProps{
    data:User[]
}

function Recommended({data}:RecommendedProps) {
    const isCollapsed=useSelector((store:any)=> store.sidebar.isCollapsed)
    const show=!isCollapsed && data.length>0;
    
    return (
        <div >
           {show &&
             (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>Recommended Channels</p>
                </div>
             )
           }
        </div>
    );
}
export default Recommended