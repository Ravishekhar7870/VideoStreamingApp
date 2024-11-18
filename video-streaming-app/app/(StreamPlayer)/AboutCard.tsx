import { Divide } from 'lucide-react'
import React from 'react'
interface AboutCardProps{
    hostName:string,
     ViewerIdentity:string,
     hostId:string,
     bio?:string | "",
     followerCount:number
}
function AboutCard({hostId,hostName,ViewerIdentity,bio,followerCount}:AboutCardProps) {
    const hostAsViewer=`self${String(hostId)}`
    const isHost=JSON.stringify(ViewerIdentity)===JSON.stringify(hostAsViewer)
    
    const label=followerCount===0 ? 'Follower':"Followers"
  return (
   <div className='px-4'>
    <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
        <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
            About {hostName}
        </div>
          {isHost && (
            <p>Edit</p>
          )}
          </div>
          <div className='text-sm text-muted-foreground'>
           <span className='font-semibold text-primary'>
           {followerCount+1}
           </span > {label}
           
          </div>
          <p className='text-sm'>
            {bio || ""}
          </p>
    </div>

   </div>
  )
}

export default AboutCard