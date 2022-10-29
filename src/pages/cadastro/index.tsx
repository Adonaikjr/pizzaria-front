import Head from 'next/head'
import logo from '../../assets/logo.svg'
import styles from '../../../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormEvent, useContext, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

export default function Cadastro() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    if (name === '' || email === '' || password === '') {
      toast('Preencha todos os campos', { theme: 'light' })
      return
    }

    setLoading(true)
    const data = {
      name,
      email,
      password,
    }
    await signUp(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - faca seu Cadastro</title>
      </Head>
      <main className={styles.containerMain}>
        <div className={styles.container}>
          <Image src={logo} alt="logo pizzaria" />
        </div>
        <form className={styles.form} onSubmit={handleSignUp}>
          <fieldset className={styles.fieldset}>
            <label>Nome</label>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>E-mail</label>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Senha</label>
            <Input
              placeholder="digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button loading={loading}>Cadastrar</Button>
            <Link href="/">
              <a className={styles.text}>Login</a>
            </Link>
          </fieldset>
        </form>
      </main>
    </>
  )
}
