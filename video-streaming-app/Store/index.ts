
import { configureStore } from "@reduxjs/toolkit";
import SideBarSlice from "./SideBarSlice";
import DashBoardSideBarSlice from "./DashBoardSidebarSlice";
const AppStore=configureStore({
     reducer:{
      sidebar:SideBarSlice.reducer,
      DashBoardsidebar:DashBoardSideBarSlice.reducer
     }
})
export default AppStore