import { ToastContainer } from 'react-toastify'
import './App.css'
import { AppProvider } from './contexts/app.context'
import { LogProvider } from './contexts/logger.context'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <div className="g-sidenav-show bg-gray-100">
      <AppProvider>
        <LogProvider>{routeElements}</LogProvider>
      </AppProvider>

      <ToastContainer />
    </div>
  )
}

export default App
