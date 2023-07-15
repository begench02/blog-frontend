import { Button } from 'components'
import ArticleInput from 'components/ArticleInput'
import ArticleTextarea from 'components/ArticleTextArea'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { TArticle, TArticleCreate } from 'types/article.types'
import { api } from 'utils/api'

export default function AdminNewArticle() {
    const queryClient = useQueryClient()
    const methods = useForm<TArticleCreate>()
    const navigate = useNavigate()

    const addArticle = useMutation({
        mutationFn: async (article: TArticleCreate): Promise<TArticle> => {
            const newArticle = await api.post<TArticle>('articles', article)
            return newArticle.data
        },
        onSuccess() {
            queryClient.invalidateQueries('articles')
            toast.success('Article added successfully')
            navigate('/admin/articles')            
        }
    })

    const onSubmit = (data: TArticleCreate) => {
        addArticle.mutate(data)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ArticleInput placeholder='Title' register='title' type='string' />
                <ArticleTextarea placeholder='Body' register='body' />
                <Button text='Save' />
            </form>
        </FormProvider>
    )
}
