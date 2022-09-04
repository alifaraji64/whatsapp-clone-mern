import { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { conversationContext } from '../contexts/ConversationsProvider'
import { contactContext } from '../contexts/ContactsProvider'
function Conversations () {
  const ConversationContext = useContext(conversationContext)
  const ContactContext = useContext(contactContext)
  return (
    <>
      <ListGroup variant='flush'>
        {ConversationContext.conversations.map((conversation,index) =>(
        <ListGroup.Item
        key={index}
        action
        active={index === ConversationContext.selectedConversationIndex}
        onClick={()=> ConversationContext.setSelectedConversationIndex(index)}
        >
          {conversation.recipients.map(recipientId => (
            ContactContext.findName(recipientId)
          )).join(', ')}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Conversations
