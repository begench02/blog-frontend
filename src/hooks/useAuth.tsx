import Cookies from 'js-cookie'
import { useState, createContext, useContext, Dispatch, SetStateAction } from 'react'

const AuthContext = createContext<TAuthContext | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const refresh_token = Boolean(Cookies.get('refresh_token'))
    const [isAuth, setAuth] = useState<boolean>(refresh_token)

    return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

type TAuthContext = {
    isAuth: boolean
    setAuth: Dispatch<SetStateAction<boolean>>
}
