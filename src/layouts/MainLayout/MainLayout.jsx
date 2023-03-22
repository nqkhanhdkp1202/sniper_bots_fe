import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../pages/Sidebar/Sidebar'

export default function MainLayout() {
  return (
    <div>
      <div className="min-height-300 position-absolute w-100"></div>
      <Sidebar />
      <Outlet />
    </div>
  )
}
