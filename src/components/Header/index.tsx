import { useContext } from 'react'
import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import logout from '../../assets/logout.svg'
import Link from 'next/link'
import { Button } from '../Button'
import { AuthContext } from '../../context/AuthContext'

export function Header() {
  const { signOut } = useContext(AuthContext)

  return (
    <header className={styles.containerHeader}>
      <Link href="/">
        <Image className={styles.containerImage} src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className={styles.containerUl}>
          <Link href="/category">Nova Categoria</Link>
          <Link href="/cardapio">Cardapio</Link>
          <Button onClick={signOut}>
            <Image src={logout} alt="sair" />
          </Button>
        </ul>
      </nav>
    </header>
  )
}
