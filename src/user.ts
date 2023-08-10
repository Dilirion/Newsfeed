import axios from 'axios';
import { User } from './types';
import { modifyName } from './utils';

export const getUserName = async (id: number): Promise<string> => {
  const { data: user } = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  const [name, surname] = user.name.split(' ');

  return `${modifyName(name)} ${modifyName(surname)}`;
};
