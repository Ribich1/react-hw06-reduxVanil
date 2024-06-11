import React, { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm/ContactForm ';
import ContactList from './ContactList/ContactList ';
import Filter from './Filter/Filter ';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, delContact, filtrContact } from '../redux/store';

export default function App() {
  const dispatch = useDispatch();
  const contactsR = useSelector(state => state.phonenote.book);

  console.log('contactsR555', contactsR);

  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const handleAddContact = e => {
    // if (contacts.find(contact => contact.name === e.name)) {
    //   alert(`${e.name} is already in the contacts`);
    //   return;
    // }
    if (contactsR.find(contact => contact.name === e.name)) {
      alert(`${e.name} is already in the contacts`);
      return;
    }

    // const contactEl = {
    //   id: nanoid(),
    //   name: e.name,
    //   number: e.number,
    // };
    // setContacts(prevContacts => [contactEl, ...prevContacts]);
    dispatch(addContact(e.name, e.number));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
    getVissibleContacts();
  };

  const getVissibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const result = contactsR.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    console.log('result', result);
    // dispatch(filtrContact(result));
    return result;
  };
  const deleteContact = contactId => {
    const arrFiltr = contactsR.filter(contact => contact.id === contactId)[0];
    console.log('filterId', arrFiltr);
    dispatch(delContact(arrFiltr.id));
    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== contactId)
    // );
  };
  useEffect(() => {
    if (isFirstRender.current && contactsR.length === 0) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contactsR));
  }, [contactsR]);

  return (
    <>
      <div className={css.div}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <Filter filterEl={filter} onChangeEl={changeFilter} />
        <ContactList onDeleteContact={deleteContact} result={ getVissibleContacts()} />
      </div>
    </>
  );
}
