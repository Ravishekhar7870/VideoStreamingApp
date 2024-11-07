'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UseDispatch } from 'react-redux'

import { useEffect } from 'react'
import { DashBoardSideBarSliceActions } from '@/Store/DashBoardSidebarSlice'
function Toggle() {
    const isCollapsed=useSelector((store:any)=>store.DashBoardsidebar.isCollapsed);
    const dispatch=useDispatch();
    useEffect(() => {
      const handleResize = () => {
        if (!isCollapsed && window.innerWidth <= 640) {
          dispatch(DashBoardSideBarSliceActions.setCollapseAsTrue());
        }
      };
  
    
      handleResize();
  
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isCollapsed, dispatch]);
    const handleArrowClick=()=>{
      dispatch(DashBoardSideBarSliceActions.ChangeState());
    }
    
  return (
   <>
      {isCollapsed && (
        
              <Button variant='ghost'
              className='h-auto p-2 ml-auto'
              >
                <ArrowRightFromLine className='h-4 w-4' onClick={handleArrowClick} />
                </Button>
               

            )}
            {  
                !isCollapsed &&
             (
                <div className='p-3 pl-6 mb-2 hidden lg:flex item-center w-full'>
                <p className='font-semibold text-primary'>Dashboard</p>
                <Button variant='ghost' className='h-auto p-2 ml-auto '>
                <ArrowLeftFromLine className='h-4 w-4 ' onClick={handleArrowClick}/>
                </Button>
                </div>
            )
        }
        </>
  )
}

export default Toggle