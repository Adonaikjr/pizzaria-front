import { createContext, ReactNode, useState } from 'react'


type type_auth_context_data = {
    user: type_UserProps;
    isAuthenticated: boolean;
    login: (props: type_LoginProps) => Promise<void>;
}

type type_UserProps = {
    id: string;
    name: string;
    email: string;
}

type type_LoginProps = {
    email: string;
    password: string;
}
type type_children = {
    children: ReactNode;
}

export const Auth_context = createContext({} as type_auth_context_data)

export function ReturnAuthContextProvider({ children }: type_children) {

    const [user, setUser] = useState<type_UserProps>();
    const isAuthenticated = !!user;

    async function login() {
        alert('voce clicou no login')
    }
    return (
        <Auth_context.Provider value={{ user, isAuthenticated, login }}>
            {children}
        </Auth_context.Provider>
    )
}

