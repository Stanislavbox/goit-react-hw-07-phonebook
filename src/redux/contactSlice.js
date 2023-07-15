import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getContacts, postContact, delContact } from './operations';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await getContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      await postContact(newContact);
      return await getContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactID, { rejectWithValue }) => {
    try {
      await delContact(contactID);
      return await getContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
}

const initialData = { items: [], isLoading: false, error: null };

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialData,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: handleFulfilled,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: handleFulfilled,
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: handleFulfilled,
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactReducer = contactSlice.reducer;
