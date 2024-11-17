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
import { RemoveThumbnailAction, UpdateUserStreamAction } from '@/Actions/Stream.actions'
import { toast } from 'sonner'
import { UploadDropzone } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import HoverHint from '@/components/HoverHint'
import { Trash } from 'lucide-react'
import Image from 'next/image'
interface InfoModalProps{
    StreamName:string
    ThumbnailUrl?:string 
}
function InfoModal({StreamName,ThumbnailUrl}:InfoModalProps) {
    const [newStreamName,setStreamName]=useState(StreamName)
    const [newThumbnailUrl,setThumbnailUrl]=useState(ThumbnailUrl)
    const [isPending,startTransition]=useTransition();
    const closeRef=useRef<ElementRef<'button'>>(null);
    const router=useRouter()
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
    const onRemoveThumbnail=()=>{
        startTransition(()=>{
            RemoveThumbnailAction()
            .then(()=>{
                toast.success('Thumbnail Sucessfully removed')
                setThumbnailUrl("")
                closeRef?.current?.click()
            })
            .catch(()=>{
                toast.error("Something went wrong")
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
            <div className='space-y-2'>
                <label>
                    Thumbnail
                </label>
                { ThumbnailUrl ? (
                  <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                    <div className='absolute top-2 right-2 z-[10]'>
                        <HoverHint hintText='Remove Thumbnail' >
                           <Button type='button' disabled={isPending} className='h-auto w-auto p-1.5' onClick={onRemoveThumbnail}>
                             <Trash className='h-4 w-4'/>
                           </Button>
                        </HoverHint>
                        </div>
                        <Image src={ThumbnailUrl} alt='Thumbnail' fill className='object-cover'/>
                    </div>
                ):
            
               (<div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                endpoint='thumbnailUploader'
                appearance={{
                    label:{
                        color:'#FFFFFF'
                    },
                    allowedContent:{
                        color:'#FFFFFF'
                    }
                }}
                onClientUploadComplete={(res)=> {setThumbnailUrl(res?.[0].url)
                          router.refresh()
                          closeRef?.current?.click()
                          toast.success('Thubmnail Sucessfully Uploaded')
                }
                }
                />
               </div>)}
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