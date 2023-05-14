import { CategoryNames } from './types';

export const categoryIds: Record<CategoryNames, number> = {
  tech: 1,
  sport: 2,
  fashion: 3,
  politics: 4,
  other: 5,
  ['karpov.courses']: 6,
};

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  sport: 'Спорт',
  ['karpov.courses']: 'Karpov',
  other: 'Прочее',
  politics: 'Политика',
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};
