'use client'
import AppStore from "@/Store";
import React from "react";
import { Provider } from "react-redux";



function ReduxLayout({children}:{children:React.ReactNode}) {
  return (
    <Provider store={AppStore}>
        {children}
    </Provider>
  )
}

export default ReduxLayout