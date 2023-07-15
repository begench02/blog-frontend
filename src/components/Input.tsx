import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

interface IProps {
    register: string
    validation?: Record<string, string>
    placeholder: string
    type: string
}

export default function Input({ register, placeholder, type }: IProps) {
    const methods = useFormContext()

    return <InputStyled {...methods.register(register)} placeholder={placeholder} type={type} />
}

const InputStyled = styled.input`
    background-color: transparent;
    outline: none !important;
    padding: 1rem;
    margin: 1rem 0;
    color: #e0e0e2;
    border: 1px solid gray;
    width: 100%;
    border-radius: 6px;
`
