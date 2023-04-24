import { useContext } from "react"
import styles from "./styles.module.scss"
import Link from "next/link"

import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from "../../contexts/authContext"

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={"/dashboard"}>
                    <img src="/logo.svg" width={190} height={60} alt="logo sujeito pizzaria" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href={"/category"} legacyBehavior>
                        <a >Categorias</a>
                    </Link>

                    <Link href={"/product"} legacyBehavior>
                        <a>Cardápio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}