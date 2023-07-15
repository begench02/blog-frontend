import { api } from 'utils/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, Navigate } from 'react-router-dom'
import { TArticle } from 'types/article.types'
import { useState } from 'react'
import { Button, Modal } from 'components'
import { AdminHeader } from './AdminHeader'
import styled from 'styled-components'
import { toast } from 'react-hot-toast'

export default function AdminArticles() {
    const [modal, setModal] = useState('')
    const queryClient = useQueryClient()

    const { data, isError } = useQuery('articles', async () => {
        const articles = await api.get<TArticle[]>('articles')
        return articles.data
    })

    const onDelete = useMutation({
        mutationFn: async (): Promise<TArticle> => {
            const article = await api.delete<TArticle>(`articles/${modal}`)
            return article.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })

    const modalConform = () => {
        onDelete.mutate()
        setModal('')
        toast.success('Article deleted')
    }

    if (isError) return <Navigate to='/error' />

    return (
        <Main>
            <Modal
                open={modal}
                text='Are you sure you want to delete article'
                declineFn={() => setModal('')}
                conformFn={modalConform}
            />
            <AdminHeader />
            <Link to='/admin/articles/article/new'>
                <Button text='Add new article, bitch' />
            </Link>

            <div>
                {data?.map((article: TArticle) => (
                    <Heading key={article._id}>
                        <h2>
                            <Link to={`/admin/articles/article/${article._id}`}>{article.title}</Link>
                        </h2>
                        <Delete onClick={() => setModal(article._id)}>&#9747;</Delete>
                    </Heading>
                ))}
            </div>
        </Main>
    )
}

const Main = styled.div`
    & > div {
        margin: 3rem 0;
    }
`

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4rem 0;
`

const Delete = styled.div`
    display: grid;
    align-items: center;
    font-size: 1.4rem;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        color: ${props => props.theme.activeColor};
    }
`
