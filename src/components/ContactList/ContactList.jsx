import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import PropTypes from 'prop-types';
import {
  selectContacts,
  selectStatusFilter,
  selectIsLoading,
} from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);
  const contactsQuery = useSelector(selectStatusFilter);
  const filterContactsList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactsQuery.toLowerCase())
  );

  return (
    <ul className={css.contact_List}>
      {filterContactsList.length ? (
        filterContactsList.map(contact => (
          <li className={css.contact_item} key={contact.id}>
            {contact.name} - {contact.phone}
            {!isLoading && (
              <button
                type="button"
                className={css.contact_button}
                onClick={() => dispatch(deleteContact(contact.id))}
              >
                Delete
              </button>
            )}
          </li>
        ))
      ) : (
        <p className={css.contact__message}>No such contact with that name</p>
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  contactsQuery: PropTypes.string,
  dispatch: PropTypes.func,
};
