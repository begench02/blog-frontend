import styled from 'styled-components'

export default function Header() {
    return (
        <HeaderWrapper>
            <h1>
                Personal blog by{' '}
                <a target='_blank' href='https://github.com/begench02/'>
                    Begench Geldyev
                </a>
            </h1>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: grid;
    justify-items: center;
    & > h1 {
        font-size: 2rem;
    }
`
