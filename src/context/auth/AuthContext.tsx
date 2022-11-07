
import { createContext } from 'react';
import { TUser } from '../../types/TUser';

export type AuthContextType = {
    user: TUser | null;
    signin: (username: string, password: string) => Promise<Boolean>
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);