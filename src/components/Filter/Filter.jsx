import React from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux/filterSlise';
import { selectStatusFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectStatusFilter);
  const changeFilter = event => {
    dispatch(change(event.currentTarget.value));
  };

  return (
    <div className={css.filter_container}>
      <label className={css.filter_label} htmlFor="example filter">
        Find contacts by name
      </label>
      <input
        className={css.filter_input}
        type="text"
        name="filter"
        value={value}
        onChange={changeFilter}
      />
    </div>
  );
};
