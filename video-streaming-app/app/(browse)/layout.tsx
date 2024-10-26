import React from 'react'
import Navbar from './_component/Navbar/Navbar'

function Browselayout({children}:{children:React.ReactNode}) {
  return (
    < >
    <Navbar/>
       <div className='h-full pt-20'>
       {children}
        </div>
        
    </>
  )
}

export default Browselayout
