import { useRef,useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { contactContext } from '../contexts/ContactsProvider';
const ContactModal = ({  setModalOpen  }) => {
    const idRef = useRef();
    const nameRef = useRef();
    const ContactContext = useContext(contactContext);
    const handleSubmit = (e)=>{
        e.preventDefault();
        ContactContext.createContact(idRef.current.value, nameRef.current.value)
        setModalOpen(false);
    }
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit' className='mt-3'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default ContactModal
