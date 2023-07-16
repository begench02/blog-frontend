import styled from 'styled-components'

type TProps = {
    text: string
}

export default function Button({ text }: TProps) {
    return <ButtonStyled type='submit'>{text}</ButtonStyled>
}

const ButtonStyled = styled.button`
    color: aliceblue;
    background-color: transparent;
    border: 1px solid gray;
    padding: 1rem;
    cursor: pointer;
    margin: 1rem 0;
    width: 100%;
    transition: 0.5s;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    &:hover {
        border: 1px solid pink;
        color: pink;
    }
`
