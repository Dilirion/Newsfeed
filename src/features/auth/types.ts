import { User, UserCredential } from 'firebase/auth';

export type TAuthContext = {
  isAuthenticate: boolean | null;
  user: User | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
};
