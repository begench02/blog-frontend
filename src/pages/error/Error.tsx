import styled from 'styled-components'
import walterWhite from 'assets/walter_white.jpg'
import { MainImage } from 'components'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <Wrapper>
            <Heading>Ooops, something went wrong</Heading>
            <MainImage src={walterWhite} />
            <MainPageLink>
                <Link to='/'> Go to main page </Link>
            </MainPageLink>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
`

const Heading = styled.h2`
    margin: 2rem 0;
    color: ${props => props.theme.color};
`

const MainPageLink = styled.div`
    margin: 3rem 0;
    font-size: 1.5rem;
    color: ${props => props.theme.activeColor};
`