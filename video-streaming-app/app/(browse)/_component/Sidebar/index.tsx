

import Wrapper from './Wrapper'
import Toggle from './Toggle'
import Recommended, { RecommendedSkelton } from './Recommended'
import RecommendChannel from '@/lib/RecommendChannel'

import { UseSelector } from 'react-redux'
import { getFollowedChannel } from '@/Controllers/Follower.controller'
import FollowedList from './FollowedList'
async function Sidebar() {
     const recommend=await RecommendChannel()
     const followedUser=await getFollowedChannel();
  return (
   <Wrapper>
     {/* <div className="hidden sm:block"> Hide Toggle on small screens */}
        <Toggle />
        <div className='space y-4 pt-4 lg:pt-0'>
          <Recommended data={recommend} />
          <div className="h-4"></div>
          <FollowedList data={followedUser}/>
        </div>
   </Wrapper>
  )
}


export default Sidebar