import containerInput from './styles.module.scss'

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface type_input_props extends InputHTMLAttributes<HTMLInputElement> { }
interface type_textarea_props extends InputHTMLAttributes<HTMLTextAreaElement> { }

export function Input({ ...rest }: type_input_props) {
    return (
        <input className={containerInput.input} {...rest} />
    )
}


export function TextArea({ ...rest }: type_textarea_props) {
    return (
        <textarea className={containerInput.input} {...rest} ></textarea>
    )
}