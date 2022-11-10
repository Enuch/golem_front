import { useEffect, useState } from "react"
import { TUser } from "../../types/TUser";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<TUser | null>(null);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');

            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data) {
                    setUser(data);
                }
            }
        }
        validateToken();
    }, []);

    const signin = async (username: string, password: string) => {
        const data = await api.signin(username, password);
        if (data.user && data.access_token) {
            setUser(data.user);
            setTokenUser(data.access_token)
            return true;
        }
        return false;
    }

    const signout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    }

    const setTokenUser = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}