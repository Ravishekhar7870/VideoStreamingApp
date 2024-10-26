
import { createSlice } from "@reduxjs/toolkit";
const SideBarSlice=createSlice({
    name:"sidebar",
    initialState:{
        isCollapsed:false
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
        }
    }
})
export const SideBarSliceActions=SideBarSlice.actions
export default SideBarSlice