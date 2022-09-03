import { createContext, useState, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { contactContext } from './ContactsProvider'
export const conversationContext = createContext()
const ConversationsProvider = ({ children }) => {
  const ContactContext = useContext(contactContext)
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [id, setId] = useLocalStorage('id')
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
  const addMessageToConversation = ({ recipients, text, sender }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { text, sender }
      //create an array base on prevConversations
      const newConversations = prevConversations.map(conversation => {
        if (arrEquality(conversation.recipients, recipients)) {
          //we have the conversation, add the messages
          console.log(newMessage)
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }
        //if we don't have the conversation, we gonna return the same item
        return conversation
      })
      return newConversations

      // if (madeChange) {
      //   return newConversations;
      // } else {
      //   //if we have this conversation already
      //   console.log(recipients);
      //   return [...prevConversations, { recipients, messages: [newMessage] }]

      // }
    })
  }
  const sendMessage = ({ recipients, text, id }) => {
    console.log(id)
    addMessageToConversation({ recipients, text, sender: id })
  }

  const messages =
    selectedConversationIndex !== -1 &&
    conversations[selectedConversationIndex].messages.map(message => {
      return {
        ...message,
        senderName:
          message.sender === id ? 'You' : ContactContext.findName(message.sender),
        fromMe: message.sender === id
      }
    })
  return (
    <conversationContext.Provider
      value={{
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
        sendMessage,
        messages
      }}
    >
      {children}
    </conversationContext.Provider>
  )
}

export default ConversationsProvider

const arrEquality = (a, b) => {
  if (a.length !== b.length) return false
  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
