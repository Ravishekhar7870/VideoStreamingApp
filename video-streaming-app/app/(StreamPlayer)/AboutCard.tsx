import React from 'react'
interface AboutCardProps{
    hostName:string,
     ViewerIdentity:string,
     hostId:string,
     bio?:string | "",
     followerCount:number
}
function AboutCard({hostId,hostName,ViewerIdentity,bio,followerCount}:AboutCardProps) {
  return (
    <div>AboutCard</div>
  )
}

export default AboutCard