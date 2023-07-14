import axios from 'axios';

axios.defaults.baseURL = 'https://64afc617c60b8f941af4995b.mockapi.io';

export const getContacts = async () => {
  const response = await axios.get(`/contacts`);
  return response.data;
};

export const postContact = async newContact => {
  await axios.post(`/contacts`, newContact);
};

export const delContact = async contactId => {
  await axios.delete(`/contacts/${contactId}`);
};
