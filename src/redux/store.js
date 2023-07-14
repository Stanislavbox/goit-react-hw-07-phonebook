import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactSlice';
import { filterSlice } from './filterSlise';

export const store = configureStore({
  reducer: {
    data: contactReducer,
    filter: filterSlice.reducer
  },
});

