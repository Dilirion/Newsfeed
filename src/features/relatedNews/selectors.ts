import { RootState } from '@app/store';
import { Article } from '@features/articleItem/types';

export const getRelatedArticles =
  (articleId: number) =>
  (state: RootState): Article[] =>
    state.relatedArticles[articleId] || [];
