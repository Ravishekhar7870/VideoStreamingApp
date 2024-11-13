import React from 'react'
import { Loader } from 'lucide-react'
interface LoadingProps{
  label:string
}
function LoadingVideo({label}:LoadingProps) {
  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
      <Loader className='h-10 w-10 text-muted-foreground animate-spin'/>
      <p className='text-muted-foreground'>
        {label}
      </p>
    </div>
  )
}

export default LoadingVideo