
import { createSlice } from "@reduxjs/toolkit";
const initialIsCollapsed = JSON.parse(localStorage.getItem("isChatCollapsed") || "false");
const ChatCollapsedSlice=createSlice({
    name:"ChatCollapsed",
    initialState:{
        isCollapsed:initialIsCollapsed
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
          localStorage.setItem("isChatCollapsed", JSON.stringify(state.isCollapsed)); 
        },
        setCollapseAsTrue:(state)=>{
            state.isCollapsed=true;
            localStorage.setItem("isChatCollapsed", JSON.stringify(state.isCollapsed))
        }
    }
})
export const ChatCollapsedSliceActions=ChatCollapsedSlice.actions
export default ChatCollapsedSlice