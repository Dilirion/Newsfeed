import { CategoryNames } from './types';

export const categoryIds: Record<CategoryNames, number> = {
  tech: 1,
  sport: 2,
  fashion: 3,
  politics: 4,
  ['karpov.courses']: 6,
  other: 5,
};

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  sport: 'Спорт',
  ['karpov.courses']: 'Karpov',
  politics: 'Политика',
  other: 'Прочее',
};
