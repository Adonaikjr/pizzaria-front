/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/connect/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: types_signUp) => Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}
interface types_signUp {
  name: string
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies()
    if (token) {
      api
        .get('/profile')
        .then((response) => {
          const { id, name, email } = response.data
          setUser({
            id,
            name,
            email,
          })
        })
        .catch(() => {
          // se deu errado, deslogar
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      })
      // console.log(response.data);

      const { id, name, token } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: '/', // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      // Passar para proximas requisiçoes o nosso token
      api.defaults.headers.Authorization = `Bearer ${token}`
      toast('Bem vindo', { theme: 'light' })
      // Redirecionar o user para /dashboard
      Router.push('/dashboard')
    } catch (err) {
      toast.error('Login ou senha incorretos')
    }
  }

  async function signUp({ name, email, password }: types_signUp) {
    console.log(name)

    try {
      const response = await api.post('/users', { name, email, password })
      toast.success('Cadastrado com sucesso')

      Router.push('/')
    } catch (error) {
      toast.error('Erro ao cadastrar, reveja os campos')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
