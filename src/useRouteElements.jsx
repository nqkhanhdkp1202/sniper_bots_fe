import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './constants/path'
import { AppContext } from './contexts/app.context'

import { useContext } from 'react'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import SwapToken from './pages/SwapToken'
import ChartSimulation from './pages/ChartSimulation'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to="/swap-token" />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.swapToken,
              element: <SwapToken />
            },
            {
              path: path.chartSimulation,
              element: <ChartSimulation />
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routeElements
}
