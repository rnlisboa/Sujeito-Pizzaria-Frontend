import Head from "next/head";
import Image from "next/image"
import logoImg from "../../public/logo.svg";
import styles from "../styles/Home.module.scss"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito pizzaria" />

        <div className={styles.login}>
          <form>
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
