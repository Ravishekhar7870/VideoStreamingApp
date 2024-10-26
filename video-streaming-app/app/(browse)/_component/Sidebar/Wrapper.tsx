'use client'
import { useSelector, UseSelector } from "react-redux";
import { SideBarSliceActions } from "@/Store/SideBarSlice";

interface WrapperProps{
    children:React.ReactNode;
}
function Wrapper({children}:WrapperProps) {
    const isCollapsed=useSelector((store:any)=> store.sidebar.isCollapsed)

  return (
    <aside className={`fixed left-0 flex flex-col ${isCollapsed ? 'w-16' : 'w-60'} h-full bg-[#151518] border-r z-50`}>
            {children}
        </aside>
  )
}

export default Wrapper