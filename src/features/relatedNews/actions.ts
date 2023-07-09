import { createAsyncThunk } from '@reduxjs/toolkit';
import { setRelatedArticles } from '@features/relatedNews/slice';
import { apiFetchRelatedArticles } from '@app/publicApi';

export const fetchRelatedArticles = createAsyncThunk('api/fetchRelatedArticles', (articleId: number, thunk) => {
  return apiFetchRelatedArticles(articleId).then((news) => {
    thunk.dispatch(setRelatedArticles({ id: articleId, articles: news.items }));
  });
});
