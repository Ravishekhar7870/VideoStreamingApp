import { getSearchedStreams } from '@/Controllers/Stream.controller'
import React from 'react'
import Resultcard, { ResultCardSkelton } from './Resultcard';
import { Skeleton } from '@/components/ui/skeleton';
interface SearchedStreamProps{
    term?:string
}
async function SearchedStream({term}:SearchedStreamProps) {
    const data=await getSearchedStreams(term || "");

  return (
    <div>
         <h2 className='text-lg  font-semibold mb-4'>
                Showing Results for &quot; {term} &quot;
            </h2>
            {data.length===0 && (
                <p className='text-muted-foreground text-sm'>
                    No Stream found...
                </p>
            ) }
            <div className='flex flex-col gap-y-4'>
             {data.map((item)=>(
                <Resultcard key={item._id} data={item} />
             ))}
            </div>
    </div>
  )
}
export const SearchedStreamSkelton=()=>{
    return (
        <div>
           <Skeleton className='mb-4 h-8 w-[290px]'/>
           <div className='flex flex-col gap-y-4'>
            {
                [...Array(4)].map((_,i)=>(
                    <ResultCardSkelton key={i}/>
                ))
            }

           </div>
        </div>
    )
}
export default SearchedStream