import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchNews, apiFetchTrends } from '@app/api';
import { setNews, setTrends } from '@features/articlesList/slice';

export const fetchNews = createAsyncThunk('api/fetchNews', (_, thunk) => {
  apiFetchNews().then((news) => {
    thunk.dispatch(setNews(news.items));
  });
});

export const fetchTrends = createAsyncThunk('api/fetchTrends', (_, thunk) => {
  apiFetchTrends().then((trends) => {
    thunk.dispatch(setTrends(trends.items));
  });
});
