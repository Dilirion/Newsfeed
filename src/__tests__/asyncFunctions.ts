const callbackFunction = (callback: (message: string) => any) => {
  setTimeout(() => {
    callback('ok');
  }, 2000);
};

const promiseFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ok');
    }, 2000);
  });
};

const manyTimeouts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('1');
    }, 1000);

    setTimeout(() => {
      console.log('2');
    }, 2000);

    setTimeout(() => {
      console.log('3');
    }, 3000);

    setTimeout(() => {
      console.log('4');
      resolve('ok');
    }, 4000);
  });
};

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const json = await response.json();

  return json;
};

describe('async functions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('callbackFunction: callback called with message ok', (done) => {
    callbackFunction((message) => {
      expect(message).toBe('ok');
      done();
    });

    jest.runAllTimers();
  });

  test('promiseFunction: resolves with message ok', () => {
    const promise = promiseFunction();

    jest.runAllTimers();

    return expect(promise).resolves.toBe('ok');
  });

  test('manyTimeouts', () => {
    const promise = manyTimeouts();

    // jest.advanceTimersByTime(1000);
    // jest.advanceTimersToNextTimer();
    // jest.advanceTimersToNextTimer(3);
    // jest.runOnlyPendingTimers();
    jest.runAllTimers();

    return expect(promise).resolves.toBe('ok');
  });
});

describe.only('server data', () => {
  test('getData', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;

    const data = await getData();

    expect(2).toBe(2);
  });
});
