import React from 'react'
import { columns,  } from './_components/columns'
import { DataTable } from './_components/data-table'
import { getblockedUser } from '@/Controllers/Blocked.controller'
import { Item } from '@radix-ui/react-select'
import { format } from 'date-fns'

async function page() {
    const blockedUser = await getblockedUser()
    const data=blockedUser.map((item)=>({
        id:item._id,
        userId:item.blockedUser._id,
  ProfilePic:item.blockedUser.ProfilePic,
  username:item.blockedUser.username,
  createdAt:format(new Date(item.createdAt),"dd/MM/yyyy")
    }))
  return (
    <div className='p-6'>
        <div className='mb-4'>
            <h1 className='text-2xl font-bold'>
                Community Settings
            </h1>
        </div>
        <DataTable columns={columns} data={data} />

    </div>
  )
}

export default page