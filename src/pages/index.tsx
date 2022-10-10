import Head from 'next/head'
import logo from '../assets/logo.svg'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'


export default function Home() {

  const [submit, setSubmit] = useState(false)

  function handleSubmit(){
    setSubmit(true)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - faca seu login</title>
      </Head>
      <main className={styles.containerMain} >

        <div className={styles.container}>
          <Image src={logo} alt='logo pizzaria'/>
        </div>

        <form>
          <fieldset className={styles.fieldset} >
            <label>E-mail</label>
            <Input placeholder='Digite seu email' type='email'/>
            <label>Senha</label>
            <Input placeholder='digite sua senha' type='password'/>
            <Button type="submit" loading={submit} onClick={handleSubmit}>
              Entrar
            </Button>
          </fieldset>
        </form>
      </main>
    </>
  )
}