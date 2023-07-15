import { api } from 'utils/api'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { TArticle, TArticleCreate } from 'types/article.types'
import { ArticleInput, ArticleTextarea, Button } from 'components'

export default function AdminArticle() {
    const navigate = useNavigate()
    const methods = useForm<TArticleCreate>()
    const { id } = useParams<string>()

    const onSubmit = async (data: any) => {
        const res = await api.put(`/articles/${id}`, data)
        toast.success(res.data.message)
        navigate('/admin')
    }

    const { data, isError } = useQuery(`${id}`, async () => {
        const article = await api.get<TArticle>(`articles/${id}`)
        return article.data
    })

    if (isError) return <Navigate to='/error' />

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <ArticleInput placeholder='Title' type='text' defaultValue={data?.title} register='title' />
                <ArticleTextarea placeholder='Body' defaultValue={data?.body} register='body' />
                <Button text='Save' />
            </Form>
        </FormProvider>
    )
}

const Form = styled.form`
    display: grid;
`
