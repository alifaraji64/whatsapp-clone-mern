import { createContext, useState, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { contactContext } from './ContactsProvider'
import { socketContext } from './SocketProvider'
export const conversationContext = createContext()
const ConversationsProvider = ({ children }) => {
  const ContactContext = useContext(contactContext)
  const SocketContext = useContext(socketContext)
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
    console.log(recipients);
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
    })
  }
  useEffect(() => {
    console.log('use effect');
    if(!SocketContext.socket) return;
    SocketContext.socket.on('recieve-message', addMessageToConversation)
    return ()=> {
      console.log('closed');
      SocketContext.socket.off('recieve-message')
    }

  },[SocketContext.socket, addMessageToConversation]);
  const sendMessage = ({ recipients, text, id }) => {
    SocketContext.socket.emit('send-message',{ recipients, text })
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
