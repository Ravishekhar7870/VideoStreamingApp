"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

export type BlockedUser = {
  id:string,
  userId:string,
  ProfilePic:string,
  username:string,
  createdAt:string
}

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: "username",
  },
  {
    accessorKey: "createdAt",
    header: "Blocked date",
  },
  {
    id:"actions",
    cell:()=> <Button variant='primary'>Unblock</Button>,
  },
]
