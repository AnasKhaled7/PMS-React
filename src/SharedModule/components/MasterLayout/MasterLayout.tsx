import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div>
    <div className="d-flex">
      <div>
        <SideBar />
      </div>
      <div className="w-100">
        <Outlet />
      </div>
    </div>
  </div>
  )
}
