import { canSSRAuth } from "../utils/canSSRAuth"
import Head from "next/head"
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from "react-modal"
import { Header } from "../../components/Header/"

import { setupAPIClient } from "@/services/api"
import { useState } from "react"
import { ModalOrder } from "@/components/ModalOrder"

type OrderProps = {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null

}

interface HomeProps {
    orders: OrderProps
}

export type orderItemProps = {
    map(arg0: (item: any) => JSX.Element): import("react").ReactNode
    id: string;
    amount: number;
    order_id: string;
    product : {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string
    };
    order: OrderProps
}

export default function Dashboard({ orders }: HomeProps) {
    const [order, setOrder] = useState(orders || [])
    
    const [modalItem, setModalItem] = useState<orderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id:string){
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/order/detail", {
            params: {
                order_id: id
            }
        }) 

        setModalItem(response.data)
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Ùltimos pedidos</h1>
                        <button>
                            <FiRefreshCcw color="#3fffa3" size={25} />
                        </button>
                    </div>


                    <article className={styles.listOrders}>
                        {
                            order.map(item => (
                                <section key={item.id} className={styles.orderItem}>
                                    <button onClick={()=>handleOpenModalView(item.id)}>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {item.table}</span>
                                    </button>
                                </section>
                            ))
                        }

                    </article>

                </main>

                { modalVisible && (
                    <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    />
                )}
            </div>


        </>
    )
}

export const getServerSideProps = canSSRAuth(async context => {
    const apiClient = setupAPIClient(context)

    const response = await apiClient.get("/orders")

    console.log(response.data)
    return {
        props: {
            orders: response.data
        }
    }
})