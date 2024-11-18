'use client'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import {
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    Dialog
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { updateUserbioAction } from '@/Actions/User.actions'
import { toast } from 'sonner'
interface BioModalProps{
    bio?:string
}
function BioModal({bio}:BioModalProps) {
  const [newbio,setBio]=useState(bio || "")
  const [isPending,startTransition]=useTransition()
  const closeDialogRef=useRef<ElementRef<'button'>>(null)
 const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(!newbio){
    return;
  }
    startTransition(()=>{
      updateUserbioAction(newbio)
      .then(()=>{
        toast.success('Your bio has been updated')
        closeDialogRef?.current?.click();
      })
      .catch(()=>{
        toast.error('Something Went Wrong')
      })
    })
 }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='link' size='sm' className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit your bio
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={onSubmit}>
          <Textarea  placeholder='User bio' value={newbio} onChange={(e)=> setBio(e.target.value)} className='resize-none' />
            <div className='flex justify-between'  >
              <DialogClose asChild ref={closeDialogRef}>
                <Button type='button' variant='ghost' >
                  Cancel
                </Button>
              </DialogClose>
              <Button variant='primary' type='submit' disabled={isPending}>Save</Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BioModal