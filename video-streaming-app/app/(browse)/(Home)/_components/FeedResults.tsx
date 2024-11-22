import { getStreamFeed } from '@/Controllers/Stream.controller'
import React from 'react'
import Streamcard from './Streamcard';

async function FeedResults() {
    const streamResult=await getStreamFeed();
  return (
    <div>
        <h2 className='text-lg font-semibold mb-4'>
            Streams you may like
        </h2>
        {
            streamResult.length===0 && (
                <div className='text-muted-foreground text-sm'>
                    No Stream Found
                </div>
            )
        }
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4'>
             {
                streamResult.map((stream)=>(
                   <Streamcard key={stream._id} data={stream}/>    
                ))
             }
        </div>
    </div>
  )
}
export const FeedResultsSkelton=()=>{
    return (
        <div>

        </div>
    )
}
export default FeedResults