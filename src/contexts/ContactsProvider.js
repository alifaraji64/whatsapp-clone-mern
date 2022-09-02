import React , {createContext} from 'react';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const contactContext = createContext();
const ContactsProvider = ({  children  }) => {
    const [contacts, setContacts] = useLocalStorage('contacts',[]);
    const createContact=(id, name)=>{
        setContacts(prevContacts=>{
            return [...prevContacts,{ id, name}]
        })
    }
    const findName = (id)=>{
        const name = contacts.find(contact=>contact.id==id).name;
        console.log(name);
        return name;
    }
    return (
        <contactContext.Provider value={{contacts, createContact, findName}}>
            {children}
        </contactContext.Provider>
    );
}

export default ContactsProvider;
