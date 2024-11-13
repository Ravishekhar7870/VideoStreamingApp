
import { createSlice } from "@reduxjs/toolkit";
const initialIsCollapsed = JSON.parse(localStorage.getItem("isChatCollapsed") || "false");
const initialVariant=localStorage.getItem("ChatVariant") || "CHAT"
export enum ChatVariant{
    CHAT="CHAT",
    COMMUNITY="COMMUNITY"
}
const ChatCollapsedSlice=createSlice({
    name:"ChatCollapsed",
    initialState:{
        isCollapsed:initialIsCollapsed,
        variant:initialVariant
    },
    reducers:{
        ChangeState:(state)=>{
          state.isCollapsed=!state.isCollapsed
          localStorage.setItem("isChatCollapsed", JSON.stringify(state.isCollapsed)); 
        },
        setCollapseAsTrue:(state)=>{
            state.isCollapsed=true;
            localStorage.setItem("isChatCollapsed", JSON.stringify(state.isCollapsed))
        },
        onVariantChange:(state,action)=>{
            state.variant=action.payload.chatVariant
            localStorage.setItem("ChatVariant",JSON.stringify(state.variant))
        }
    }
})
export const ChatCollapsedSliceActions=ChatCollapsedSlice.actions
export default ChatCollapsedSlice