
import { configureStore } from "@reduxjs/toolkit";
import SideBarSlice from "./SideBarSlice";
import DashBoardSideBarSlice from "./DashBoardSidebarSlice";
import ChatCollapsedSlice from "./ChatCollapsedSlice";
const AppStore=configureStore({
     reducer:{
      sidebar:SideBarSlice.reducer,
      DashBoardsidebar:DashBoardSideBarSlice.reducer,
      ChatCollapsed:ChatCollapsedSlice.reducer
     }
})
export default AppStore