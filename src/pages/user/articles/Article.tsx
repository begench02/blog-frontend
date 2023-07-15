import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { api } from 'utils/api'
import { TArticle } from 'types/article.types'

export default function Article() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isError } = useQuery(`${id}`, async () => {
        const article = await api.get<TArticle>(`articles/${id}`)
        return article.data
    })

    if (isError) return navigate('/error')

    return (
        <Wrapper>
            <BackArrow onClick={() => navigate(-1)}>&#8592;</BackArrow>
            <Heading>{data?.title}</Heading>
            <div>
                <p>{data?.body}</p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
`

const BackArrow = styled.div`
    position: absolute;
    cursor: pointer;
    color: ${props => props.theme.activeColor};
    left: 4rem;
    font-size: 2.5rem;
`

const Heading = styled.h1`
    margin: 2rem 0 4rem 0;
    font-size: 3rem;
`
