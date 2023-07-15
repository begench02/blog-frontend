import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

type TProps = {
    placeholder: string
    register: string
    defaultValue?: string
}

export default function ArticleTextarea({ placeholder, register, defaultValue = '' }: TProps) {
    const methods = useFormContext()

    return <Textarea defaultValue={defaultValue} placeholder={placeholder} {...methods.register(register)} />
}

const Textarea = styled.textarea`
    color: #fff !important;
    width: 100%;
    outline: none !important;
    background-color: transparent;
    text-align: center;
    border: none;
    padding: 2rem;
    font-size: 2rem;
    width: 100%;
    margin-bottom: 2rem;
    width: 100%;
    font-size: 1.5rem;
    height: 60vh;
`
