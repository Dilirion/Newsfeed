const checkData = (data: number, onSuccess: (message: string) => any) => {
  if (data === 2) {
    onSuccess('ok');
  } else {
    onSuccess('not ok');
  }
};

describe.only('checkData', () => {
  test('Вызывает onSuccess ok', () => {
    // const onSuccess = jest.fn();
    const onSuccess = jest.fn((message) => message);
    const data = 2;

    checkData(data, onSuccess);

    expect(onSuccess).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith('ok');
    expect(onSuccess).toHaveReturnedWith('ok');
  });

  test('jest.fn', () => {
    // const mock = jest.fn();
    // const mock = jest.fn().mockReturnValueOnce(5);
    const mock = jest.fn().mockReturnValueOnce(5).mockReturnValueOnce(1).mockReturnValueOnce('Hello');

    // const result = mock('click!');

    // expect(result).toBeUndefined();
    // expect(result).toBe(5);
    expect(mock('click!')).toBe(5);
    expect(mock('click!')).toBe(1);
    expect(mock('click!')).toBe('Hello');
    expect(mock).toHaveBeenCalledTimes(3);
    expect(mock).toHaveBeenCalledWith('click!');
  });
});
