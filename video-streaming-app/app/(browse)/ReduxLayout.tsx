'use client'
import React from 'react'
import { Provider } from 'react-redux'
import AppStore from '@/Store'
function ReduxLayout({children}:{children:React.ReactNode}) {
  return (
    <Provider store={AppStore}>
        {children}
    </Provider>
  )
}

export default ReduxLayout