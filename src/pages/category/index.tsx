import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/connect/api'
import { yesAuth } from '../../utils/yesAuth'
export default function Category() {
  const [name, setName] = useState('')

  // register category
  async function handleRegisterCategory(event: FormEvent) {
    // nao renderizar
    event.preventDefault()
    // se name for vazio nao retornar nada
    if (name === '') {
      return
    }

    // chamando api importada de services
    const apiClient = setupAPIClient()
    // pedido para cadastro receber insomnia json name
    await apiClient.post('/category', {
      name,
    })

    toast('categoria cadastrada com sucesso')
    setName('')
  }
  return (
    <>
      <Head>
        <title>nova categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.containerMain}>
          <h1>Cadastrar Categoria</h1>
          {/* onSubimit inside form  */}
          <form
            className={styles.containerForm}
            onSubmit={handleRegisterCategory}
          >
            {/* onChange inside input capture infos */}
            <input
              className={styles.containerInput}
              type="text"
              placeholder="digite o nome da categoria "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.containerButton}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  )
}
export const getServerSideProps = yesAuth(async (ctx) => {
  return {
    props: {},
  }
})
