import { Article } from '@features/articleItem/types';
import { Category } from '@features/categories/types';
import { Source } from '@features/sources/types';

export interface NewsAPI {
  sources: Source[];
  categories: Category[];
  items: Article[];
}
