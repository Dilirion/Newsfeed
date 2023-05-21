import { RootState } from '@app/store';
import { Article } from '@features/articleItem/types';

export const getCategoryNews =
  (categoryId: number) =>
  (state: RootState): Article[] =>
    state.categoryArticles[categoryId] || [];
