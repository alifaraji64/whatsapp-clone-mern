import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { contactContext } from '../contexts/ContactsProvider';
function Conversations() {
    const ContactContext = useContext(contactContext);
    return (<>
    {/* {ContactContext.contacts.map(contact=>(
        <h1 key={contact.id}>{contact.name}</h1>
    ))} */}
    <ListGroup variant='flush'>
    {ContactContext.contacts.map(contact=>(
        <ListGroup.Item key={contact.id}>
            {contact.name}
        </ListGroup.Item>
    ))}
    </ListGroup>
    </>);
}

export default Conversations;