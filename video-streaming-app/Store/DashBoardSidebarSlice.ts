
import { createSlice } from "@reduxjs/toolkit";
const initialIsCollapsed = JSON.parse(localStorage.getItem("isDashboardCollapsed") || "false");
const DashBoardSideBarSlice=createSlice({
    name:"DashBoardsidebar",
    initialState:{
        isCollapsed:initialIsCollapsed
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
          localStorage.setItem("isDashboardCollapsed", JSON.stringify(state.isCollapsed)); 
        },
        setCollapseAsTrue:(state)=>{
            state.isCollapsed=true;
            localStorage.setItem("isDashboardCollapsed", JSON.stringify(state.isCollapsed))
        }
    }
})
export const DashBoardSideBarSliceActions=DashBoardSideBarSlice.actions
export default DashBoardSideBarSlice