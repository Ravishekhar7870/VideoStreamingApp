import { toast } from "sonner";
import {jwtDecode,JwtPayload} from 'jwt-decode'
import { useEffect, useState } from "react";
import { CreateViewerToken } from "@/Actions/Token.actions";
export const useViewerToken=async(hostIdentity:string)=>{
    const [token,setToken]=useState("")
    const [identity,setIdentity]=useState("")
    const [name,setName]=useState("")
    useEffect(()=>{
     const createToken=async()=>{
         try {
            const getToken=await CreateViewerToken(hostIdentity)
            setToken(getToken)
            const decodeToken=await jwtDecode(getToken) as JwtPayload & {name?:string}
            const name=decodeToken?.name;
            if(name){
               setName(name)
            }
            const identity=decodeToken.jti
            if(identity){
               setIdentity(identity)
            }
         } catch (error) {
            throw new Error("something went wrong")
         }
      createToken()
     }
    },[hostIdentity])
    return {
        token,identity,name
    }
}