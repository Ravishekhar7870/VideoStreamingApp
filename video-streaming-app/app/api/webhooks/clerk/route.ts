import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import DbConect from '@/lib/Dbconnect'
import UserModel from '@/Model/User.mode'
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
      const createUser=await UserModel.create({
        clerkId:payload.data.id,
        username:payload.data.username,
        ProfilePic:payload.data.image_url
      })
      console.log(createUser);
  }
  

  return new Response('', { status: 200 })
}