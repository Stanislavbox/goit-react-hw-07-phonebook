import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = { value: '' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { changeFilter: change } = filterSlice.actions;
