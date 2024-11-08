'use server'
import { UpdateUserStrean } from "@/Controllers/Stream.controller"
import { Stream } from "@/Model/Stream.model"

export const UpdateUserStreamAction=async(values:Partial<Stream>)=>{
    try {
        const getStream=await UpdateUserStrean(values)
    } catch (error) {
        throw new Error("something went wrong")
    }
   
}