'use client'
import React, { ElementRef, ElementType, useRef, useState, useTransition } from 'react'
import { Dialog,DialogClose,DialogContent,DialogHeader,DialogTrigger,DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk'
import { CreateIngress } from '@/Actions/Ingress.actions'
import { toast } from 'sonner'
const RTMP=String(IngressInput.RTMP_INPUT)
const WHIP=String(IngressInput.WHIP_INPUT)
type ingressType=typeof RTMP | typeof WHIP
function ConnectModal() {
    const [ingresstype,setIngressType]=useState<ingressType>(RTMP)
    const [isPending,startTransition]=useTransition();
    const closeRef=useRef<ElementRef<"button">>(null)
    const onGenerate=()=>{
        startTransition(()=>{
            CreateIngress(parseInt(ingresstype))
            .then(()=>{
                toast.success("Ingress Created")
                closeRef?.current?.click();
            })
            .catch(()=>{
                toast.error("Couldn't create Ingress")
            })
        })
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='primary'>
                Generate Connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Generate Connection
                </DialogTitle>
            </DialogHeader>
            <Select disabled={isPending} value={ingresstype} onValueChange={(value)=> setIngressType(value)}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Ingress Type'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RTMP}>RTMP</SelectItem>
                    <SelectItem value={WHIP}>WHIP</SelectItem>
                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle className='w-4 h-4'/>
                <AlertTitle>!Warning</AlertTitle>
                <AlertDescription>
                    This will reset all the active Stream using the current Connection
                </AlertDescription>
            </Alert>
            <div className='flex justify-between'>
             <DialogClose asChild ref={closeRef}>
                <Button variant='ghost'>
                    Cancel
                </Button>
             </DialogClose>
             <Button onClick={onGenerate} disabled={isPending} variant='ghost'>
                Generate
             </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal