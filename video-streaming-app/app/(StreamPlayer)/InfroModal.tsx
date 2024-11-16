'use client'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog ,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UpdateUserStreamAction } from '@/Actions/Stream.actions'
import { toast } from 'sonner'
interface InfoModalProps{
    StreamName:string
    ThumbnailUrl?:string 
}
function InfoModal({StreamName,ThumbnailUrl}:InfoModalProps) {
    const [newStreamName,setStreamName]=useState(StreamName)
    const [isPending,startTransition]=useTransition();
    const closeRef=useRef<ElementRef<'button'>>(null);
    const onSave=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       
        startTransition(()=>{
            UpdateUserStreamAction({name:newStreamName})
            .then(()=>{
                toast.success('Sucessfully edit Stream Details')
                closeRef?.current?.click()
            })
            .catch(()=>{
                toast.error("Something went Wrong")
            })
        })
    }
  return (
   <Dialog>
    <DialogTrigger asChild>
     <Button variant='link' size='sm' className='ml-auto'>
        Edit
     </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Edit Stream Info
            </DialogTitle>
        </DialogHeader>
        <form className='space-y-14' onSubmit={onSave}>
            <div className='space-y-2'>
             <Label>
                Name
             </Label>
             <Input placeholder='Stream Name' value={newStreamName} onChange={(e)=> setStreamName(e.target.value)} />
            </div>
            <div className='flex justify-between'>
             <DialogClose asChild ref={closeRef}>
                <Button type='button' variant='ghost'>
                  Cancel
                </Button>
             </DialogClose>
             <Button disabled={false} type='submit' variant='primary' >
                 Save
             </Button>
            </div>
        </form>
    </DialogContent>
   </Dialog>
  )
}

export default InfoModal