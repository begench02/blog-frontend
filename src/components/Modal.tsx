import styled from 'styled-components'
import ReactDom from 'react-dom'

type TProps = {
    open: string
    text: string
    declineFn: () => void
    conformFn: () => void
}

export default function Modal(props: TProps) {
    if (!props.open) return null

    return ReactDom.createPortal(
        <Overlay>
            <Wrapper>
                <Cancel onClick={props.declineFn}>&#9747;</Cancel>
                <Heading>{props.text}</Heading>
                <Buttons>
                    <Decline onClick={props.declineFn}>Decline</Decline>
                    <Conform onClick={props.conformFn}>Delete</Conform>
                </Buttons>
            </Wrapper>
        </Overlay>,
        document.getElementById('portal') as Element
    )
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
`

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 20rem;
    text-align: center;
    transform: translate(-55%, -50%);
    background-color: #fafafc;
    border-radius: 20px;
`

const Cancel = styled.div`
    display: inline;
    position: absolute;
    color: #000;
    top: 10px;
    right: 15px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        color: ${props => props.theme.activeColor};
    }
`

const Heading = styled.h2`
    margin: 2rem 0 3rem 0;
    color: #000;
`

const Buttons = styled.div`
    display: flex;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    background-color: #f2f2f5;
    padding: 1rem;
    border-radius: 20px;
`

const Button = styled.button`
    display: grid;
    justify-items: center;
    border-radius: 10px;
    width: 5rem;
    padding: 1rem;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: 600;
`

const Decline = styled(Button)`
    background-color: transparent;
    color: #ababb4;
    margin-right: 2rem;
`

const Conform = styled(Button)`
    background-color: #eb5757;
`
