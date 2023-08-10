import axios from 'axios';
import { getUserName } from './user';
import * as utils from './utils';
import { User } from './types';

// jest.mock('./utils', () => ({
//   modifyName: () => 'Дима Безуглый',
// }));
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUserName', () => {
  beforeEach(() => {
    const user: Partial<User> = {
      name: 'Дима Безуглый',
    };
    mockedAxios.get.mockResolvedValue({ data: user });

    jest.spyOn(utils, 'modifyName');
  });

  test('Возвращает имя при вызове функции', async () => {
    const id = 3;

    const name = await getUserName(id);

    expect(name).toBe('Дима Безуглый');
    expect(utils.modifyName).toHaveBeenCalledTimes(2);
  });
});
