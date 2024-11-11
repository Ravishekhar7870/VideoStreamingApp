import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './Toggle'
import Navigation from './Navigation'
import getUser from '@/lib/GetUser'

async function Sidebar() {
  const user=await getUser()
  return (
    <Wrapper>
        <Toggle/>
        <Navigation username={user?.username}/>
        </Wrapper>
  )
}

export default Sidebar