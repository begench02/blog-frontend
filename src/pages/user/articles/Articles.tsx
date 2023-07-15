import { useQuery } from 'react-query'
import { Link, Navigate } from 'react-router-dom'
import { TArticle } from 'types/article.types'
import { api } from 'utils/api'
import Header from './Header'
import styled from 'styled-components'

export default function Articles() {
    const { data, status } = useQuery('articles', async () => {
        const { data } = await api.get<TArticle[]>('articles')
        return data
    })

    if (status === 'error') return <Navigate to='error' />

    return (
        <div>
            <Header />
            <ArticlesWrapper>
                {data?.map((article: TArticle) => {
                    return (
                        <ArticleWrapper key={article._id}>
                            <h2>
                                <Link to={`/articles/${article._id}`}>{article.title}</Link>
                            </h2>
                            <div>
                                <p>{article.body}</p>
                            </div>
                            <Time>
                                <p>{article.date.slice(0, 10)}</p>
                            </Time>
                        </ArticleWrapper>
                    )
                })}
            </ArticlesWrapper>
        </div>
    )
}

const ArticlesWrapper = styled.div`
    margin-top: 4rem;
`

const ArticleWrapper = styled.div`
    display: grid;
`

const Time = styled.div`
    justify-self: end;
`
