import { RootState } from '@app/store';
import { Category } from '@features/categories/types';

export const getCategories = (state: RootState): Category[] => state.categories;
