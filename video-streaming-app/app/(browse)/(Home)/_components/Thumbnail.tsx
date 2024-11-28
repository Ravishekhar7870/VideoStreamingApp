import ChannelAvatar from '@/components/Avatar';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react'
interface ThumbnailProps{
    src?:string,
      fallback?:string,
      username:string,
      isLive?:boolean
}
function Thumbnail({src,fallback,username,isLive}:ThumbnailProps) {
    let ImageToShow;
    if(!src){
        ImageToShow=(
            <div className='bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform
            group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md'>
             <ChannelAvatar username={username} islive={isLive} imageUrl={fallback} />
            </div>
        )
    }
    else{
      ImageToShow=(
        <Image src={src} fill alt='Thumbnail' className='object-cover transition-transform group-hover:translate-x-2
        group-hover:-translte-y-2 rounded md'
         />
      )
    }
  return (
    <div className='group aspect-video relative rounded-md cursor-pointer'>
        <div className='rounded-md absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
         
        </div>
        {ImageToShow}
    </div>
  )
}
export const ThumbnailSkelton=()=>{
  return (
    <div className='group aspect-video relative rounded-md cursor-pointer'>
      <Skeleton className='w-full h-full'/>
    </div>
  )
}

export default Thumbnail