import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import DbConect from "@/lib/Dbconnect";
import StreamModel from "@/Model/Stream.model";
const reciever=new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!
)
export async function POST (req:Request){
    await DbConect();
    const body=await req.text()
    const headerPayload=headers();
    const authorization=headerPayload.get('Authorization');
    if(!authorization){
        return new Response("no authoriation found",{status:400})
    }
    const event=await reciever.receive(body,authorization)
    const getstream=await StreamModel.findOne({
        ingressId:event?.ingressInfo?.ingressId
    })
    if(!getstream){
        throw new Error("no stream found")
    }
    if(event.event==='ingress_ended'){
        getstream.isLive=false
        await getstream.save({validateBeforeSave:false})
    }
    if(event.event==='ingress_started'){
        getstream.isLive=true;
        await getstream.save({validateBeforeSave:false})
    }
}