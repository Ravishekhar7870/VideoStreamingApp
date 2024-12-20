import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import DbConect from '@/lib/Dbconnect'
import UserModel from '@/Model/User.mode'
import StreamModel from '@/Model/Stream.model'
export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOKS_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOKS_SECRET from Clerk Dashboard to .env or .env.local')
    }
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
          status: 400,
        })
      }
      const payload = await req.json()
      const body = JSON.stringify(payload)
        // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
 
  const eventType = evt.type
  await DbConect();
  if(eventType==='user.created'){
     try {
       const createUser=await UserModel.create({
         clerkId:payload.data.id,
         username:payload.data.username,
         ProfilePic:payload.data.image_url
       })
       await StreamModel.create({
         UserId:createUser._id,
         name:`${payload.data.username}'s stream`
       })
      
       
     } catch (error) {
      console.error("Error updating user:", error); 
      return new Response("something went wrong")
     }
     
  }
  if(eventType==='user.updated'){
     const clerkId=payload.data.id;
     const currUser=await UserModel.findOne({
       clerkId:clerkId
     })
     if(!currUser){
         
        return new Response("couldn't find  the user",{status:400})
     }
     if(currUser){
      try {
        currUser.username=payload?.data?.username ;
        currUser.ProfilePic=payload?.data?.image_url;
        await currUser.save({validateBeforeSave:false})
        await UserModel.findById(currUser._id);
      
      } catch (error) {
        console.error("Error updating user:", error);  // Log the error for debugging
        return new Response("Something went wrong", { status: 500 });
      }
     }
     

  }
  if(eventType==='user.deleted'){
    const clerkId=payload.data.id;
    const user=await UserModel.findOne({
       clerkId:clerkId
    })
    if(!user){
        return new Response("couldn't find the user",{status:400})
    }
    else{
       try {
        console.log(user)
         await  UserModel.findByIdAndDelete(user._id)
        
       
       } catch (error) {
        console.error("Error updating user:", error); 
          return new Response("something went wrong",{status:500})
       }
    }
  }

  

  return new Response('', { status: 200 })
}