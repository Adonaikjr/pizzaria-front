import Modal from 'react-modal'
import styles from './styles.module.scss'
import { typeItemOrderListProps } from '../../pages/dashboard'
import { FiX } from 'react-icons/fi'

interface type_modal_orders_props {
  isOpen: boolean
  onRequestClose: () => void
  order: typeItemOrderListProps[]
  handleFinishOrder: (id: string) => void
}

export function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: type_modal_orders_props) {
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      padding: '30px',
      transform: 'translate( -50%, -50% )',
      backgroundColor: '#1d1d2e',
      width: '80%',
      height: '80%',
      borderRadius: '18px',
    },
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="submit"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{
          background: 'transparent',
          width: '100%',
          textAlign: 'right',
          border: 'transparent',
        }}
      >
        <FiX size={30} color="red" />
      </button>

      <h1>Detalhes do pedido</h1>
      <span className={styles.containerMesa}>
        Mesa: <strong>{order[0].order.table}</strong>
      </span>

      {order.map((item) => (
        <section key={item.id}>
          <span className={styles.containerSpan}>
            {item.amount} - <strong>{item.product.name}</strong>
          </span>
          <span className={styles.containerSpan}>
            {item.product.description}
          </span>
        </section>
      ))}
      <div>
        <h4>Total: </h4>
      </div>
      <button
        className={styles.containerButton}
        onClick={() => handleFinishOrder(order[0].order_id)}
      >
        Concluir pedido
      </button>
    </Modal>
  )
}
