import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import InfoModal from './InfroModal'

interface InfoCardProps{
    hostId?:string,
     ViewerIdentity?:string,
     Streamname:string,
     thumbnailUrl?:string 
}
function InfoCard({hostId,ViewerIdentity,Streamname,thumbnailUrl}:InfoCardProps) {
    const hostAsViewer=`self${String(hostId)}`
    const isHost=JSON.stringify(ViewerIdentity)===JSON.stringify(hostAsViewer)
    if(!isHost){
        return null
    }
  return (
    <div className='p-4'>
        <div className='rounded-xl bg-background'>
            <div className='flex items-center gap-x-2.5 p-4'>
                <div className='rounded-md bg-blue-600 p-2 h-auto w-auto'>
                    <Pencil className='h-5 w-5'/>
                </div>
                <div>
                    <h2 className='text-sm lg:text-lg font-semibold capitalize'>
                        Edit your stream info
                    </h2>
                </div>
               <InfoModal
               StreamName={Streamname}
               ThumbnailUrl={thumbnailUrl}
               />
            </div>
          <Separator/>
          <div className='p-4 lg:p-6 space-y-4'>
            <div >
                <h3 className='text-sm text-muted-foreground mb-2'>
                  Name
                </h3>
                <p className='text-sm font-semibold'>
                 {Streamname}
                </p>
            </div>
            <div >
                <h3 className='text-sm text-muted-foreground mb-2'>
                  Thumbnail
                </h3>
                {thumbnailUrl && (
                    <div className='relative aspect-video rounded-md overflow-hidden width-[200px] border border-white/10'>
                        <Image fill src={thumbnailUrl} alt={Streamname} className='object-cover'/>
                        </div>
                )}
            </div>
          </div>
        </div>

    </div>
  )
}

export default InfoCard