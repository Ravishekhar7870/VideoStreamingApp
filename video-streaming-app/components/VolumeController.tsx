import { Volume1,Volume2,VolumeX } from "lucide-react";
import React from 'react'
import { Slider } from "./ui/slider";
interface VolumeControllerProps{
    onToggle:()=> void,
    onChange:(value:number)=> void,
    value:number
}
function VolumeController({onChange,onToggle,value}:VolumeControllerProps) {
    const isMuted= value===0;
    const isLoud=value>50
    let VolumeIcon=Volume1;
    if(isMuted){
        VolumeIcon=VolumeX
    }
    else if(isLoud){
        VolumeIcon=Volume2
    }
    const handleChange=(value:number[])=>{
       onChange(value[0])
    }
  return (
    <div className="flex items-center gap-2">
        <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
          <VolumeIcon/>
        </button>
       <Slider className="w-[8rem] cursor-pointer" onValueChange={handleChange} value={[value]} max={100} step={1}/>
      
    </div>
  )
}

export default  VolumeController