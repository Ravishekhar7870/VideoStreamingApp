
import { configureStore } from "@reduxjs/toolkit";
import SideBarSlice from "./SideBarSlice";
const AppStore=configureStore({
     reducer:{
      sidebar:SideBarSlice.reducer
     }
})
export default AppStore