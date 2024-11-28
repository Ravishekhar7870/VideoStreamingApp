'use client'
import { useSelector } from "react-redux";

import { RecommendedSkelton } from "./Recommended";
import { FollowedListSkelton } from "./FollowedList";
import { RootState } from "@/Store";

interface WrapperProps{
    children:React.ReactNode;
}
function Wrapper({children}:WrapperProps) {
    const isCollapsed=useSelector((store:RootState)=> store.sidebar.isCollapsed)

  return (
    <aside
    className={`fixed left-0 flex flex-col h-full bg-[#151518] border-r z-50 ${
      isCollapsed ? 'w-16' : 'w-60'
    } transition-all duration-300`}
  >
    {children}
  </aside>

  )
}
export const SidebarSkelton=()=>{
  const isCollapsed=useSelector((store:RootState)=> store.sidebar.isCollapsed)
 
    
  
  return (
    <aside className={`fixed left-0 flex flex-col h-full bg-[#151518] border-r z-50 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <RecommendedSkelton/>
      <FollowedListSkelton/>
    </aside>
  )
}

export default Wrapper