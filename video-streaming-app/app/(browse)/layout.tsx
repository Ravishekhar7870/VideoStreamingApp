
import React from 'react'
import Navbar from './_component/Navbar/Navbar'
import Sidebar from './_component/Sidebar'
import ReduxLayout from './ReduxLayout'
function Browselayout({children}:{children:React.ReactNode}) {
  return (
    < >
   <ReduxLayout>
    <Navbar/>
       <div className='h-full pt-20'>
        <Sidebar/>
       {children}
        </div>
        </ReduxLayout>
    </>
  )
}

export default Browselayout
