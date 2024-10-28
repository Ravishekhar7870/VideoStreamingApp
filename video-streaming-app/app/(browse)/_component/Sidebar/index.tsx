import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './Toggle'
import Recommended from './Recommended'

function Sidebar() {
  
  return (
   <Wrapper>
     {/* <div className="hidden sm:block"> Hide Toggle on small screens */}
        <Toggle />
        <div className='space y-4 pt-4 lg:pt-0'>
          <Recommended/>
        </div>
   </Wrapper>
  )
}

export default Sidebar