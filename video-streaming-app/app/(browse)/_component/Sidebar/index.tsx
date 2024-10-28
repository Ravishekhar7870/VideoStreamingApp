import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './Toggle'
import Recommended from './Recommended'
import RecommendChannel from '@/lib/RecommendChannel'

async function Sidebar() {
     const recommend=await RecommendChannel()
  return (
   <Wrapper>
     {/* <div className="hidden sm:block"> Hide Toggle on small screens */}
        <Toggle />
        <div className='space y-4 pt-4 lg:pt-0'>
          <Recommended data={recommend}/>
        </div>
   </Wrapper>
  )
}

export default Sidebar