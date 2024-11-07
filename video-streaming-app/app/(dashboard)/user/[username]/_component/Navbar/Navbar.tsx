import React from 'react'
import Search from './Search'
import Action from '../Action'

function Navbar
() {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-[#252731]  lg:px-4 flex justify-between items-center
    shadow-sm px-2'>
        <span className='hidden md:inline'>
        GOLIVE!
        </span>
        
        <Search/>
        <Action/>
    </nav>
  )
}

export default Navbar
