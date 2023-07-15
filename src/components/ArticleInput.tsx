import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

type TProps = {
    placeholder: string
    register: string
    type: string
    defaultValue?: string
}

export default function ArticleInput({ placeholder, register, type, defaultValue = '' }: TProps) {
    const methods = useFormContext()

    return <Input placeholder={placeholder} {...methods.register(register)} defaultValue={defaultValue} type={type} />
}

const Input = styled.input`
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
`
