import Head from 'next/head'
import logo from '../../assets/logo.svg'
import styles from '../../../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useState } from 'react'
import Link from 'next/link'

export default function Cadastro() {

  const [submit, setSubmit] = useState(false)

  function handleSubmit() {
    setSubmit(true)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - faca seu Cadastro</title>
      </Head>
      <main className={styles.containerMain} >
        <div className={styles.container}>
          <Image src={logo} alt='logo pizzaria' />
        </div>
        <form className={styles.form} >
          <fieldset className={styles.fieldset} >
            <label>Nome</label>
            <Input placeholder='Digite seu nome' type='text' />
            <label>E-mail</label>
            <Input placeholder='Digite seu email' type='email' />
            <label>Senha</label>
            <Input placeholder='digite sua senha' type='password' />
            <Button type="submit" loading={submit} onClick={handleSubmit}>
              Cadastrar
            </Button>
            <Link href='/'>
              <a className={styles.text}>
                Login
              </a>
            </Link>
          </fieldset>
        </form>
      </main>
    </>
  )
}