import { getUserbyUsername } from '@/lib/GetUser'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from './_component/Navbar/Navbar'
interface layoutProps{
    params:{username:string}
    children:React.ReactNode
}
async function layout({children,params}:layoutProps) {
    const getUser=await getUserbyUsername(params.username)
    if(!getUser){
        redirect('/')
    }
  return (
    <>
       <Navbar/>
       <div className='flex h-full pt-20'>
        {children}
        </div>
        </>
  )
}

export default layout