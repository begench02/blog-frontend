import pinkmanLoading from 'assets/pinkman-loading.jpg'
import styled from 'styled-components'
import MainImage from './MainImage'

export default function Loading() {
    return (
        <Wrapper>
            <h1>Wait, it's loading, bitch</h1>
            <MainImage src={pinkmanLoading} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
`
