'use server'
import getUser from '@/lib/GetUser'
import StreamModel from '@/Model/Stream.model'
import {IngressAudioEncodingPreset,IngressInput,IngressClient,IngressVideoEncodingPreset,RoomServiceClient, type CreateIngressOptions}  from 'livekit-server-sdk'
import { TrackSource } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'
import { userAgent } from 'next/server'
const roomService=new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!
)

const ingressclient=new IngressClient(process.env.LIVEKIT_API_URL!)
export const ResetIngress=async(hostIdentiy:string)=>{
  const ingresses=await ingressclient.listIngress({
    roomName:hostIdentiy
  })
  const rooms=await roomService.listRooms([hostIdentiy])
  for(const room of rooms){
    await roomService.deleteRoom(room.name)
  }
  for(const ingress of ingresses){
    if(ingress.ingressId){
      await ingressclient.deleteIngress(ingress.ingressId)
    }
  }
};
const CreateIngress=async(ingressType:IngressInput)=>{
   const user=await getUser();
   if(!user){
    throw new Error("no Authorized")
   }
   await ResetIngress(user._id)
  const options:CreateIngressOptions={
    name:user?.username,
    roomName:user?._id,
    participantName:user?.username,
    participantIdentity:user?._id
  };
  if(ingressType===IngressInput.WHIP_INPUT){
    options.enableTranscoding=true;
  }
  else{
    options.video={
        source:TrackSource.CAMERA,
        preset:IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    } as any;
    options.audio={
      source:TrackSource.MICROPHONE,
      preset:IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    } as any;

  }
  const ingress=await ingressclient.createIngress(ingressType,options)
  if(!ingress || !ingress.url || !ingress.streamKey){
    throw new  Error("failed to create ingress")
  }
  const userStream=await StreamModel.findOne({
      UserId:user?._id
  })
  if(!userStream){
    throw new  Error("no Stream found")
  }
  userStream.ingressId=ingress.ingressId
  userStream.serverUrl=ingress.url
  userStream.serverKey=ingress.streamKey
 await userStream.save({validateBeforeSave:false})
 revalidatePath(`/user/${user.username}/Keys`)
 return ingress
}