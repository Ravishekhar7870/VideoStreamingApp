import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import SearchedStream, { SearchedStreamSkelton } from './_components/SearchedStream'
interface SearchParams{
  searchParams:{
    term?:string
  }
}
function page({searchParams}:SearchParams) {
  if(!searchParams.term){
    redirect('/')
  }
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<SearchedStreamSkelton/>}>
       <SearchedStream term={searchParams.term}/>
       </Suspense>
    </div>
  )
}

export default page