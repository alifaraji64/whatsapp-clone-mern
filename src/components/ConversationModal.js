import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { contactContext } from '../contexts/ContactsProvider'
import { conversationContext } from '../contexts/ConversationsProvider'
const ConversationModal = () => {
  const ContactContext = useContext(contactContext)
  const ConversationContext = useContext(conversationContext)
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const handleCheckboxChange = (id)=>{
    setSelectedContactIds(prevSelectedContactIds=>{
        if(prevSelectedContactIds.includes(id)){
            console.log('includes');
            return prevSelectedContactIds.filter(prevId=>{
                return prevId!==id;
            })
        }
        else{
            return [...prevSelectedContactIds, id]
        }
    })
  }
  const handleSubmit=(e)=>{
    ConversationContext.createConversation(selectedContactIds)
    e.preventDefault();
  }
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {ContactContext.contacts.map(contact=>(
            <Form.Group key={contact.id}>
                <Form.Check
                type='checkbox'
                label={contact.name}
                value={selectedContactIds.includes(contact.id)}
                onChange={()=>handleCheckboxChange(contact.id)}
                ></Form.Check>
            </Form.Group>
          ))}
          <Button type='submit' className='mt-3'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default ConversationModal
