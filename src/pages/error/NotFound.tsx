import pinkman from 'assets/pinkman.jpg'
import { MainImage } from 'components'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function NotFound() {
    return (
        <Main>
            <h2>No such page, bitch</h2>
            <MainImage src={pinkman} />
            <MainPageLink>
                <Link to='/'> Go to main page </Link>
            </MainPageLink>
        </Main>
    )
}

const Main = styled.div`
    display: grid;
    justify-items: center;
`

const MainPageLink = styled.div`
    margin: 3rem 0;
    font-size: 1.5rem;
    color: ${props => props.theme.activeColor};
`
