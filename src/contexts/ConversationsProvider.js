import { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
export const conversationContext = createContext()
const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(-1)
  const createConversation = recipients => {
    setConversations(prevConversations => {
      return [
        ...prevConversations,
        {
          recipients,
          messages: []
        }
      ]
    })
  }
  return (
    <conversationContext.Provider
      value={{
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex
      }}
    >
      {children}
    </conversationContext.Provider>
  )
}

export default ConversationsProvider
