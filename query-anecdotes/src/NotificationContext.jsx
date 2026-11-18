import { createContext, useContext, useRef, useState } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const timeoutRef = useRef(null)

  const notify = (message) => {
    clearTimeout(timeoutRef.current)
    setMessage(message)
    timeoutRef.current = setTimeout(() => setMessage(null), 5 * 1000)
  }

  return (
    <NotificationContext.Provider value={{ message, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => useContext(NotificationContext).message

export const useNotify = () => useContext(NotificationContext).notify
