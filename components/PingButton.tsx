import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`

export const PingButton: FC = () => {
    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }

    const onClick = () => {
        if (!connection || !publicKey) { return }
        const transaction = new web3.Transaction()
        const programId = new web3.PublicKey(PROGRAM_ID)
        const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY)
        
        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: programDataAccount,
                    isSigner: false,
                    isWritable: true
                },
            ],
            programId
        });

        transaction.add(instruction)
        sendTransaction(transaction, connection).then(sig => {
            setTxSig(sig)
        })
    }

    return (
        <div className={styles.buttonContainer}>
            {
                publicKey ?
                    <button className={styles.button} onClick={onClick} >Ping!</button> :
                    null
            }
            {
                txSig ?
                    <div>
                        <p>View your transaction on <a href={link()} target="_blank">Solana Explorer</a></p> 
                    </div> :
                    null
            }
        </div>
    )
}