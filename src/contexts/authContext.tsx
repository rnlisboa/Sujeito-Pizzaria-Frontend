import { createContext, ReactNode, useState } from "react"
import { destroyCookie, setCookie, parseCookies } from "nookies"
import { toast } from "react-toastify"
import { api } from "@/services/apiClient"
import Router from "next/router"
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: ()=> void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthtProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch(e){
        console.log(e)
    }
}
export function AuthProvider({ children}: AuthtProviderProps){
    const [user, setUser] = useState<UserProps>()
    
    // se houver algo em user, converta user para TRUE
    const isAuthenticated = !!user;
    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            const { id, name, token } = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60*60*24*30,
                path: '/'
            })

            setUser({id, name, email})

            //passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("logado com sucesso!")

            //redirecionar o usuario para a dashboard
            Router.push("/dashboard")
        } catch(e){
            toast.error("Erro ao acessar.")
            console.log(e)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name, 
                email,
                password
            })
            toast.success("Conta criada com sucesso!")

            Router.push("/")
        } catch(e){
            toast.error("Erro ao criar conta.")
        }
    }
    
    
    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}