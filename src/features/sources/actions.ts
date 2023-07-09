import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSources } from '@features/sources/slice';
import { apiFetchSources } from '@app/publicApi';

export const fetchSources = createAsyncThunk('api/fetchSources', (_, thunk) => {
  apiFetchSources().then((sources) => {
    thunk.dispatch(setSources(sources));
  });
});
