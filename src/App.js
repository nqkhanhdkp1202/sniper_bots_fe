import { ToastContainer } from 'react-toastify'
import './App.scss'
import { AppProvider } from './contexts/app.context'
import { LogProvider } from './contexts/logger.context'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <div className="App">
      <AppProvider>
        <LogProvider>{routeElements}</LogProvider>
      </AppProvider>
      <ToastContainer />
    </div>
  )
}

export default App
