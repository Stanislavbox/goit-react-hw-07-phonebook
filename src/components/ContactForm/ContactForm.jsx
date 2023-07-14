import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'redux/contactSlice';
import { selectContacts } from 'redux/selectors';
import PropTypes from 'prop-types';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isDuplicateContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateContact) {
      alert('The contact already exists!');
      setName('');
      setPhone('');
      return;
    }
    const id = nanoid();
    dispatch(addContact({ id, name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form_contact} onSubmit={handleSubmit}>
      <label className={css.form_label} htmlFor="example name">
        Name
      </label>
      <input
        className={css.form_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChange}
        required
      />

      <label className={css.form_label} htmlFor="example number">
        Number
      </label>
      <input
        className={css.form_input}
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={phone}
        onChange={handleChange}
        required
      />
      <button className={css.form_button}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contactsSelector: PropTypes.func,
  addContact: PropTypes.func,
};
