'use server'
import { RemoveThumbnail, UpdateUserStrean } from "@/Controllers/Stream.controller"
import { Stream } from "@/Model/Stream.model"
import { revalidatePath } from "next/cache"

export const UpdateUserStreamAction=async(values:Partial<Stream>)=>{
    try {
        const getStream=await UpdateUserStrean(values)
    } catch (error) {
        throw new Error("something went wrong")
    }
   
}
export const RemoveThumbnailAction=async()=>{
    try {
       const username= await RemoveThumbnail()
       revalidatePath('/')
       if(username){
        
        revalidatePath(`/user/${username}`)
       }
    } catch (error) {
throw new Error('something went wrong')
    }
}