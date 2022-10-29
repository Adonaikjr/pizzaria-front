import { yesAuth } from '../../utils/yesAuth'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/connect/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { ModalOrder } from '../../components/ModalOrder'
interface type_orders_props {
  id: string
  table: number | string
  status: boolean
  draft: boolean
  name: string | null
}

interface type_orders {
  orders: type_orders_props[]
}
export type typeItemOrderListProps = {
  id: string
  amount: number
  order_id: string
  product_id: string
  product: {
    name: string
    id: string
    description: string
    price: string
    banner: string
  }
  order: {
    id: string
    table: string | number
    status: boolean
    name: string | null
  }
}

export default function Dashboard({ orders }: type_orders) {
  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<typeItemOrderListProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal() {
    setModalVisible(false)
  }
  // pegando detalhes da orders
  async function handlePreview(id: string) {
    const apiClient = setupAPIClient()
    const response = await apiClient.get('/order/details', {
      params: {
        order_id: id,
      },
    })
    setModalItem(response.data)
    setModalVisible(true)
  }
  // finalizando order
  async function handleFinishModal(id: string) {
    // alert('fechar pedido' + id)
    const apiClient = setupAPIClient()
    await apiClient.put('/order/finish', {
      order_id: id,
    })
    const response = await apiClient.get('/orders')

    setOrderList(response.data)

    setModalVisible(false)
  }
  // button atualizar
  async function handleRefresh() {
    const apiClient = setupAPIClient()
    const response = await apiClient.get('/orders')
    setOrderList(response.data)
  }
  // modal span na tela com informacoes de pedidos
  Modal.setAppElement('#__next')
  return (
    <>
      <Head>
        <title> Painel Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.containerMain}>
          <div className={styles.content}>
            <h1>Ultimos Pedidos</h1>
            <button
              className={styles.containerUpdatePedidos}
              onClick={handleRefresh}
            >
              <FiRefreshCw size={30} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.containerArticle}>
            {orderList.length === 0 && (
              <span className={styles.containerSection}>
                Voce ainda nao tem pedidos em aberto
              </span>
            )}
            {orderList.map((item) => (
              <section key={item.id} className={styles.containerSection}>
                <button
                  className={styles.containerButton}
                  onClick={() => handlePreview(item.id)}
                >
                  Mesa {item.table}
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishModal}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = yesAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/orders')

  console.log(response.data)

  return {
    props: {
      orders: response.data,
    },
  }
})
