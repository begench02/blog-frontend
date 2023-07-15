import styled from 'styled-components'

export default function MainImage({ src }: { src: string }) {
    return <Image src={src} />
}

const Image = styled.img`
    width: 60%;
    height: 350px;
`
