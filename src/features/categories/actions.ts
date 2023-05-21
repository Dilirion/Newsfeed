import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchCategories } from '@app/api';
import { setCategories } from '@features/categories/slice';

export const fetchCategories = createAsyncThunk('api/fetchCategories', (_, thunk) => {
  apiFetchCategories().then((categories) => {
    thunk.dispatch(setCategories(categories));
  });
});
