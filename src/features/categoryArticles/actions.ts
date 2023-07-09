import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCategoryArticles } from '@features/categoryArticles/slice';
import { apiFetchCategory } from '@app/publicApi';

export const fetchCategoryArticles = createAsyncThunk(
  'api/fetchCategoryArticles',
  (params: { lang: string; id: number }, thunk) => {
    return apiFetchCategory(params.lang, params.id).then((news) => {
      thunk.dispatch(setCategoryArticles({ id: params.id, articles: news.items }));
    });
  }
);
