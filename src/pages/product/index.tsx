import Head from "next/head"
import styles from "./styles.module.scss"
import { Header } from "@/components/Header"
import { FiUpload } from "react-icons/fi"
import { canSSRAuth } from "../utils/canSSRAuth"
import { ChangeEvent, FormEvent, useState } from "react"
import { setupAPIClient } from "@/services/api"
import { toast } from "react-toastify"

type ItemProps = {
    id: string;
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps) {
    const [avatarURL, setAvatarURL] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categorys, setCategorys] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    function handleFile (e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files) return

        const image = e.target.files[0];

        if(!image) return

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            //URL.createObjectURL(e.target.files[0]) para gerar a preview
            setAvatarURL(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeCategory(event){
        //event.target.value retorna a posição do option (0 a n)
        setCategorySelected(event.target.value)
    }

    async function handleSubmit(event:FormEvent) {
        event.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.warning("Preencha todos os dados")
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categorys[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()

            const resp = await apiClient.post('/product', data);
            console.log(resp)
            toast.success("Produto cadastrado com sucesso.")

            setAvatarURL(null)
            setName('')
            setPrice('')
            setDescription('')
            setCategorySelected(0)
        } catch(e){
            console.log(e)
            toast.error("Erro ao cadastrar.")
        }
    }
    return (
        <>
            <Head>
                <title>Novo produto - Sujeito Pizzaria</title>
            </Head>
            <Header />
            <div>
                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color="#fff" />
                            </span>

                            <input
                                type="file"
                                accept="image/png, image/jpg"
                                onChange={handleFile}
                            />
                            {
                                avatarURL && (
                                    <img
                                        className={styles.preview}
                                        src={avatarURL}
                                        alt="foto do produto"
                                        width={250}
                                        height={250}
                                    />
                                )
                            }

                        </label>
                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categorys.map((item, index) =>(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Digite o nome do produto"
                            value={name}
                            onChange={e=> setName(e.target.value)}
                        />

                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Preço do produto"
                            value={price}
                            onChange={e=> setPrice(e.target.value)}
                        />

                        <textarea
                            placeholder="Descrição do produto"
                            value={description}
                            onChange={e=> setDescription(e.target.value)}
                        />

                        <button
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

export const getServerSideProps = canSSRAuth(async context => {
    const apiClient = setupAPIClient(context)

    const response = await apiClient.get("/category")
    
    return {
        props: {
            categoryList: response.data
        }
    }
})