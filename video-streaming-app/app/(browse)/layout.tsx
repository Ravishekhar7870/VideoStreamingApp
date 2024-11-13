
import React, { Suspense } from 'react'
import Navbar from './_component/Navbar/Navbar'
import Sidebar  from './_component/Sidebar'

import Container from './Container'
import { SidebarSkelton } from './_component/Sidebar/Wrapper'
function Browselayout({children}:{children:React.ReactNode}) {
  return (
    < >
 
    <Navbar/>
       <div className='h-full pt-20'>
        <Suspense fallback={<SidebarSkelton/>}>
        <Sidebar/>
        </Suspense>
        <Container>
       {children}
       </Container>
        </div>
        
    </>
  )
}

export default Browselayout
