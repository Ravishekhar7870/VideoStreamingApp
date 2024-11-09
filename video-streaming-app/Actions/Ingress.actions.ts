'use server'
import getUser from '@/lib/GetUser'
import {IngressAudioEncodingPreset,IngressInput,IngressClient,IngressVideoEncodingPreset,RoomServiceClient, type CreateIngressOptions}  from 'livekit-server-sdk'
import { TrackSource } from 'livekit-server-sdk'
const roomService=new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!
)
const CreateIngress=async(ingressType:IngressInput)=>{
   const user=await getUser();
   if(!user){
    throw new Error("no Authorized")
   }
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
    } as any
  }
}