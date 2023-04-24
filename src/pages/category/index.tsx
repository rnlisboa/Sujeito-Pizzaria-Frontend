import { FormEvent, useContext, useState } from "react";
import  styles  from "./styles.module.scss"
import { Header } from "@/components/Header";
import Head from "next/head";
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify";
import { canSSRAuth } from "../utils/canSSRAuth"

export default function Category(){
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        if(name === '') return 

        const apiClient = setupAPIClient();
        setLoading(true)
        await apiClient.post("/category", {
            name
        })
        setLoading(false)

        toast.success("Categoria cadastrada com sucesso!")
        setName("")
    }
    return (
        <>
        <Head>
            <title>Nova categoria - Sujeito Pizzaria</title>
        </Head>

        <div>
            <Header/>
            
            <main className={styles.container}>
                <h1>
                    Cadastrar categorias
                </h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                    type="text" 
                    placeholder="Digite o nome da categoria"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    className={styles.input}
                    />

                    <button 
                    disabled={loading}
                    className={styles.buttonAdd} 
                    type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async context =>{
    return {
        props: {}
    }
})