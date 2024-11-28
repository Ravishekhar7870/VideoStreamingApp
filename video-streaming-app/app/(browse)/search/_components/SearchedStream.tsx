import { getSearchedStreams } from '@/Controllers/Stream.controller'
import React from 'react'
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
    </div>
  )
}
export const SearchedStreamSkelton=()=>{
    return (
        <div>
           
        </div>
    )
}
export default SearchedStream