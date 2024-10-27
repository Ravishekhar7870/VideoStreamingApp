'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UseDispatch } from 'react-redux'
import { SideBarSliceActions } from '@/Store/SideBarSlice'
import { useEffect } from 'react'
function Toggle() {
    const isCollapsed=useSelector((store:any)=>store.sidebar.isCollapsed);
    const dispatch=useDispatch();
    useEffect(() => {
      const handleResize = () => {
        if (!isCollapsed && window.innerWidth <= 640) {
          dispatch(SideBarSliceActions.setCollapseAsTrue());
        }
      };
  
    
      handleResize();
  
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed, dispatch]);
    const handleArrowClick=()=>{
      dispatch(SideBarSliceActions.ChangeState());
    }
    
  return (
   <Button
   size='sm'
   variant='ghost'
    className='h-auto p-2 ml-auto hidden sm:block'>
      {isCollapsed ? (
                <ArrowRightFromLine className='h-4 w-4' onClick={handleArrowClick} />
            ) : (
                <ArrowLeftFromLine className='h-4 w-4' onClick={handleArrowClick}/>
            )}
   </Button>
  )
}

export default Toggle