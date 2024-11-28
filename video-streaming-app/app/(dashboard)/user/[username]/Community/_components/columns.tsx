"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import UnblockButton from "./UnblockButton"

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
    header: ({column})=>{
        return (
        <Button variant='ghost' onClick={()=> column.toggleSorting(column.getIsSorted==="asc")}>
          username
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
    )},
  },
  {
    accessorKey: "createdAt",
    header: "Blocked date",
  },
  {
    id:"actions",
    cell:({row})=> <UnblockButton userId={row.original.userId}/>
  },
]
