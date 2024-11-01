
import { createSlice } from "@reduxjs/toolkit";
const initialIsCollapsed = JSON.parse(localStorage.getItem("isCollapsed") || "false");
const SideBarSlice=createSlice({
    name:"sidebar",
    initialState:{
        isCollapsed:initialIsCollapsed
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
          localStorage.setItem("isCollapsed", JSON.stringify(state.isCollapsed)); 
        },
        setCollapseAsTrue:(state)=>{
            state.isCollapsed=true;
            localStorage.setItem("isCollapsed", JSON.stringify(state.isCollapsed))
        }
    }
})
export const SideBarSliceActions=SideBarSlice.actions
export default SideBarSlice