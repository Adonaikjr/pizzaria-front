import Head from 'next/head'
import logo from '../assets/logo.svg'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { FormEvent, useState } from 'react'
import Link from 'next/link'

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  async function handleFormlogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      alert('preencha todos os campos')
      return
    }
    setLoading(true);
    
    let data = {
      email,
      password,
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - faca seu login</title>
      </Head>
      <main className={styles.containerMain} >
        <div className={styles.container}>
          <Image src={logo} alt='logo pizzaria' />
        </div>
        <form className={styles.form} onSubmit={handleFormlogin} >
          <fieldset className={styles.fieldset} >

            <label>E-mail</label>
            <Input
              placeholder='Digite seu email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label>Senha</label>
            <Input
              placeholder='digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button loading={loading} >
              Entrar
            </Button>
            <Link href='/cadastro'>
              <a className={styles.text}>
                Cadastre-se
              </a>
            </Link>
          </fieldset>
        </form>
      </main>
    </>
  )
}