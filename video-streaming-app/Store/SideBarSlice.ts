
import { createSlice } from "@reduxjs/toolkit";
const SideBarSlice=createSlice({
    name:"sidebar",
    initialState:{
        isCollapsed:false
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
        },
        setCollapseAsTrue:(state)=>{
            state.isCollapsed=true;
        }
    }
})
export const SideBarSliceActions=SideBarSlice.actions
export default SideBarSlice