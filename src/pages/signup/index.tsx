import Head from "next/head";
import Image from "next/image"
import logoImg from "../../../public/logo.svg";
import styles from "@/styles/Home.module.scss"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito pizzaria" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form>
            <Input
              placeholder="Digite seu nome"
              type="text"
            />
            <Input
              placeholder="Digite seu email"
              type="text"
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
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
