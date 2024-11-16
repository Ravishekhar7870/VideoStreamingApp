'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog ,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
interface InfoModalProps{
    StreamName:string
    ThumbnailUrl?:string 
}
function InfoModal({StreamName,ThumbnailUrl}:InfoModalProps) {
  return (
    <div>InfroModal</div>
  )
}

export default InfoModal