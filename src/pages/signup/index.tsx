import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image"
import logoImg from "../../../public/logo.svg";
import styles from "@/styles/Home.module.scss"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link"
import { toast } from "react-toastify";

export default function Home() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(email === '' || password ==='' || name === ''){
      toast.warning("Preencha todos os dados")
      return;
    }

    setLoading(true)
    await signUp({
      name, 
      email, 
      password
    })

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito pizzaria" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={false}
            >
              Cadastrar
            </Button>
          </form>
          <Link href="/" legacyBehavior>
            <a className={styles.text}>já possui uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  )
}
