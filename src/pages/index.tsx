import Head from 'next/head'
import logo from '../assets/logo.svg'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { FormEvent, useState } from 'react'
import { FieldsetHTMLAttributes } from 'react'
import Link from 'next/link'

import { useContext } from 'react'
import { Auth_context } from '../context/auth_context'

export default function Home() {

  const { login } = useContext(Auth_context)

  async function handleFormlogin(event: FormEvent) {

    event.preventDefault()

    let data = {
      email: 'teste@teste.com',
      password: '123'
    }

    await login(data)
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
            <Input placeholder='Digite seu email' type='email' />
            <label>Senha</label>
            <Input placeholder='digite sua senha' type='password' />
            <Button type="submit">
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