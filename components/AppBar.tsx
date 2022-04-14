import { FC } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} />
            <span>Wallet-Adapter Example</span>
            <button>Connect</button>
        </div>
    )
}