import moment from 'moment'
import { useContext } from 'react'
import { createContext, useState } from 'react'

const LogContext = createContext()

const LogProvider = ({ children, ...restProps }) => {
  const [logContent, setLogContent] = useState([])

  const handleLogContent = (content, textColor = 'dark') => {
    setLogContent(logContent => [
      ...logContent,
      {
        content: `${moment().format('DD/MM/YYYY HH:mm:ss')} => ${content}`,
        textColor
      }
    ])
  }

  const resetLoggerMessage = () => {
    setLogContent([])
  }

  const value = { logContent, handleLogContent, resetLoggerMessage }
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
