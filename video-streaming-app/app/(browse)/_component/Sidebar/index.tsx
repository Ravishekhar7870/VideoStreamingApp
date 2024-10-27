import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './Toggle'

function Sidebar() {
  return (
   <Wrapper>
     {/* <div className="hidden sm:block"> Hide Toggle on small screens */}
        <Toggle />
    
   </Wrapper>
  )
}

export default Sidebar