
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
export type RootState = ReturnType<typeof AppStore.getState>;

// Define the AppDispatch type (optional but useful for dispatch typing)
export type AppDispatch = typeof AppStore.dispatch;
export default AppStore