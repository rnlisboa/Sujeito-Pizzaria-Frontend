import Modal from "react-modal";
import styles from "./styles.module.scss"

import { FiX } from "react-icons/fi"
import { orderItemProps } from "../../pages/dashboard"

interface ModalOrderProps {
    isOpen: boolean,
    onRequestClose: () => void,
    order: Array<orderItemProps>,
    handleFinishOrder: (id: string) => void
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {

    const customStyle = {
        content: {
            left: '20%',
            padding: '30px',
            trasform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }

    function handleFinishOrder(order: string){
        alert(order)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyle}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <div className={styles.container}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa: {order[0].order.table}
                </span>

                {order.map( item =>(
                    <section key={item.id} className={styles.containerItem}>
                        <span>
                            {item.amount} - <strong>{item.product.name}</strong>
                        </span>

                        <span className={styles.description}>
                            {item.product.description}
                        </span>
                    </section>
                ))}


                <button className={styles.buttonOrder} onClick={()=>handleFinishOrder(order[0].order_id)}>
                    Concluir pedido
                </button>
            </div>
        </Modal>
    )
}