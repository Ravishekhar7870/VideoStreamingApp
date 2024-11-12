import { Maximize,Minimize } from "lucide-react";
import React from 'react'
interface FullscreenControlProps{
    isFullScreen?:boolean,
    onToggle:()=> void
}
function FullScreenControll({isFullScreen,onToggle}:FullscreenControlProps) {
    const Icon=isFullScreen? Minimize:Maximize
  return (
    <div className="flex item-center justify-center gap-4">
        <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
            <Icon className="w-4 h-4"/>
        </button>

    </div>
  )
}

export default FullScreenControll