import Head from 'next/head'
import { yesAuth } from '../../utils/yesAuth'
import { Header } from '../../components/Header'
import styles from './style.module.scss'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, FormEvent, useState } from 'react'
import { setupAPIClient } from '../../services/connect/api'
import { toast } from 'react-toastify'

interface type_category_list {
  id: string
  name: string
}
interface type_category_list_props {
  categoryList: type_category_list[]
}
export default function Product({ categoryList }: type_category_list_props) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)
  // setCategory
  const [category] = useState(categoryList || [])
  const [selectCategory, setselectCategory] = useState(0)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  console.log(categoryList)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.files)
    if (!e.target.files) {
      return
    }
    const image = e.target.files[0]
    if (!image) {
      return
    }
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  // selecionando categoria
  function hendleSelectCategory(event) {
    // console.log('posicion section selected ', event.target.value)
    // console.log('category selected', category[event.target.value])
    //   selected category
    setselectCategory(event.target.value)
  }
  async function handleRegister(event: FormEvent) {
    event.preventDefault()
    try {
      const data = new FormData()

      if (
        name === '' ||
        price === '' ||
        description === '' ||
        imageAvatar === null
      ) {
        toast('preencha todos os campos')
        return
      }
      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', category[selectCategory].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient()

      await apiClient.post('/product', data)
      toast('producto cadastrado!')
    } catch (error) {
      console.log(error)
      toast('erro ao cadastrar')
    }
    setName('')
    setPrice('')
    setAvatarUrl(null)
    setDescription('')
    setImageAvatar('')
  }
  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Header />
      <main className={styles.containerMain}>
        <h1>Novo Produto</h1>
        <form className={styles.containerForm} onSubmit={handleRegister}>
          <label className={styles.containerLabel}>
            <span>
              <FiUpload size={36} color="#FFF" />
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
            />
            {/* colocar imagem de fundo */}
            {avatarUrl && (
              <img
                className={styles.containerImage}
                src={avatarUrl}
                alt="foto produto"
              />
            )}
          </label>

          <select
            className={styles.containerSelect}
            value={selectCategory}
            onChange={hendleSelectCategory}
          >
            {category.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              )
            })}
          </select>

          <input
            className={styles.containerInput}
            type="text"
            placeholder="Digite o nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.containerInput}
            type="text"
            placeholder="Digite o preço do produto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className={styles.containerTextarea}
            placeholder="Descreva o produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={styles.containerButton}>Cadastrar</button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = yesAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  // listando categorias
  const response = await apiClient.get('/category')
  console.log(response.data)
  return {
    props: {
      categoryList: response.data,
    },
  }
})
