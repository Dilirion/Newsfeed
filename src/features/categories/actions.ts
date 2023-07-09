import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCategories } from '@features/categories/slice';
import { apiFetchCategories } from '@app/publicApi';

export const fetchCategories = createAsyncThunk('api/fetchCategories', (_, thunk) => {
  apiFetchCategories().then((categories) => {
    thunk.dispatch(setCategories(categories));
  });
});
