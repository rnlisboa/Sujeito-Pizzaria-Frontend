import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image"
import { GetServerSideProps } from "next";
import logoImg from "../../public/logo.svg";
import styles from "../styles/Home.module.scss"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import {AuthContext} from "../contexts/authContext"
import { toast } from "react-toastify";
import { canSSRGuest } from "./utils/canSSRGuest";
export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault()
    if(email === '' || password ===''){
      toast.warning("Preencha todos os dados")
      return;
    }

    setLoading(true);
    await signIn({
      email,
      password
    })

    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async ()=> {
  return {
    props: {}
  }
})