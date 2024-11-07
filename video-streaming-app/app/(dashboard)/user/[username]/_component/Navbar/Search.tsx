"use client"

import React from 'react'
import qs from 'query-string'
import { useRef } from 'react'
import { SearchIcon,X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
function Search() {
    const Router=useRouter();
    const searchData=useRef<HTMLInputElement | null>(null);
    const SubmitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault();
         const data=searchData?.current?.value;
         if (searchData.current) {
            searchData.current.value = "";
          }
         if(!data){
            return;
         }
         const url=qs.stringifyUrl({
            url:'/',
            query:{term:data}
         },{skipEmptyString:true})
         Router.push(url)
    }
  return (
    <form className='relative flex items-center w-full lg:w-[400px] ' onSubmit={SubmitHandler}>
        <Input placeholder='Search'
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        ref={searchData}
        />
        <Button type='submit'
        size='sm'
        variant='secondary'
        className='rounded-l-none'
        >
            <SearchIcon className='h-5 w-5 text-muted-foreground'/>
        </Button>
        </form>
  )
}

export default Search