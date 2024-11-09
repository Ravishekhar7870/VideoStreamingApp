'use client'
import React from 'react'
import { Dialog,DialogClose,DialogContent,DialogHeader,DialogTrigger,DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
function ConnectModal() {
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
            <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Ingress Type'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='RTMP'>RTMP</SelectItem>
                    <SelectItem value='WHIP'>WHIP</SelectItem>
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
             <DialogClose>
                <Button variant='ghost'>
                    Cancel
                </Button>
             </DialogClose>
             <Button variant='ghost'>
                Generate
             </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal