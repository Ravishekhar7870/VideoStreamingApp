'use client'
import { useSelector, UseSelector } from "react-redux";
import { SideBarSliceActions } from "@/Store/SideBarSlice";
import { RecommendedSkelton } from "./Recommended";

interface WrapperProps{
    children:React.ReactNode;
}
function Wrapper({children}:WrapperProps) {
    const isCollapsed=useSelector((store:any)=> store.sidebar.isCollapsed)

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
  const isCollapsed=useSelector((store:any)=> store.sidebar.isCollapsed)
 
    
  
  return (
    <aside className={`fixed left-0 flex flex-col h-full bg-[#151518] border-r z-50 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <RecommendedSkelton/>
    </aside>
  )
}

export default Wrapper