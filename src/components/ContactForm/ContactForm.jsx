import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'redux/contactSlice';
import { selectContacts } from 'redux/selectors';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name may contain only letters, apostrophe, dash and spaces.'
      ),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      ),
  });

  const handleSubmit = (values, { resetForm }) => {
    const isDuplicateContact = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicateContact) {
      alert('The contact already exists!');
      resetForm();
      return;
    }

    const id = nanoid();
    dispatch(addContact({ id, ...values }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form_contact}>
        <label className={css.form_label} htmlFor="example name">
          Name
        </label>
        <Field
          className={css.form_input}
          type="text"
          name="name"
          id="name"
          required
        />
        <ErrorMessage name="name" component="div" className={css.error_message} />

        <label className={css.form_label} htmlFor="example number">
          Number
        </label>
        <Field
          className={css.form_input}
          type="tel"
          name="phone"
          id="phone"
          required
        />
        <ErrorMessage name="phone" component="div" className={css.error_message} />

        <button className={css.form_button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  contactsSelector: PropTypes.func,
  addContact: PropTypes.func,
};
