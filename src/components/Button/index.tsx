import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss'

import { FaSpinner } from 'react-icons/fa'


interface type_props_button extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}



export function Button({ loading, children, ...rest }: type_props_button) {
    return (
        <button className={styles.button} disabled={loading} {...rest}>
            {loading ? (<FaSpinner color='#fff' size={36} />) 
            : (<a className={styles.buttonText}>{children}</a>)}
        </button>
    )
}