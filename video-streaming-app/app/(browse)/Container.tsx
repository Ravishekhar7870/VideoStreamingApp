'use client'
import { RootState } from '@/Store'
import React from 'react'
import { useSelector } from 'react-redux'
interface containerProps{
    children:React.ReactNode
}
function Container({children}:containerProps) {
    const isCollapsed=useSelector((store:RootState)=> store.sidebar.isCollapsed)
  return (
    <div className={`flex-1 ${isCollapsed? 'ml-[70px]':'ml-[70px] lg:ml-60'}`}>
        {children}
        </div>
  )
}

export default Container