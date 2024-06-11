import React from 'react';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';

const ContactList = ({ onDeleteContact, result }) => {
  const contactsR = useSelector(state => state.phonenote.book);
  console.log('123', contactsR);
  console.log('33333', result);
  return (
    <ul className="ContactsList">
      {(result.length>0?result:contactsR).map(({ id, name, number }) => (
        <li key={id} className={css.ContactsList__item}>
          {name}: {number}
          <button onClick={() => onDeleteContact(id)} className={css.BtnDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
