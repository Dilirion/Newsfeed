import { createAsyncThunk } from '@reduxjs/toolkit';
import { setArticleItem } from '@features/articleItem/slice';
import { apiFetchArticleItem } from '@app/publicApi';

export const fetchArticleItem = createAsyncThunk('api/fetchArticleItem', (articleId: number, thunk) => {
  return apiFetchArticleItem(articleId).then((article) => {
    thunk.dispatch(setArticleItem(article));
  });
});
