
import { createContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import io from 'socket.io-client'
export const socketContext = createContext()

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState()
  const [id, setId] = useLocalStorage('id')
  useEffect(() => {
    const newSocket = io('http://localhost:8000', { query: { id } })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  console.log(socket);
  return (
    <socketContext.Provider value={{socket}}>{children}</socketContext.Provider>
  )
}

export default SocketProvider
