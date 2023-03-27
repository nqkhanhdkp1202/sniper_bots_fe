import { useContext } from 'react'
import { createContext, useState } from 'react'

const LogContext = createContext()

const LogProvider = ({ children, ...restProps }) => {
  const [logContent, setLogContent] = useState(['Connect metamask...'])

  const handleLogContent = value => {
    setLogContent([...logContent, value])
  }

  const value = { logContent, handleLogContent }
  return (
    <LogContext.Provider value={value} {...restProps}>
      {children}
    </LogContext.Provider>
  )
}

const useLog = () => {
  const context = useContext(LogContext)
  if (typeof context === 'undefined')
    throw new Error('useLog must be used within Log Provider')
  return context
}

export { LogProvider, useLog }
