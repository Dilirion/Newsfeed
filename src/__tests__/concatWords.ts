const concatWords = (words: string[]): string => {
  const result = words.filter(Boolean).map((word, i) => {
    if (i === 0) {
      return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    } else {
      return word.toLowerCase();
    }
  });

  //const formatter = new Intl.ListFormat('ru', { style: 'long', type: 'conjunction' });

  //return formatter.format(result);
  return '';
};

describe('concatWords', () => {
  test('[Яблоки, персики, груши] → Яблоки, персики и груши', () => {
    const setup = ['Яблоки', 'персики', 'груши'];
    const result = concatWords(setup);

    expect(result).toBe('Яблоки, персики и груши');
  });

  test('Первая буква всегда большая', () => {
    const setup = ['яблоки', 'персики', 'груши'];
    const result = concatWords(setup);

    expect(result).toBe('Яблоки, персики и груши');
  });

  test('Все буквы маленькие кроме первой', () => {
    const setup = ['ябЛокИ', 'пЕрсИКи', 'грУши'];
    const result = concatWords(setup);

    expect(result).toBe('Яблоки, персики и груши');
  });

  test('Возвращает пустую строку, если передать пустой массив', () => {
    const setup: any[] = [];
    const result = concatWords(setup);

    expect(result).toBe('');
  });

  test('Возвращает пустую строку, если массив состоит из пустой строки', () => {
    const setup: any[] = [];
    const result = concatWords(setup);

    expect(result).toBe('');
  });

  test('Возвращает слово с большой буквы, если в массиве только одно слово', () => {
    const setup = ['яблоки'];
    const result = concatWords(setup);

    expect(result).toBe('Яблоки');
  });
});
