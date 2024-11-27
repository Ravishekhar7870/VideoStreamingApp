import React from 'react'
interface ThumbnailProps{
    src?:string,
      fallback?:string,
      username:string,
      isLive?:boolean
}
function Thumbnail({src,fallback,username,isLive}:ThumbnailProps) {
  return (
    <div>Thumbnail</div>
  )
}

export default Thumbnail