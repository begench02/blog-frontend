import { api } from 'utils/api'
import { isAxiosError } from 'axios'
import { Button } from 'components'
import { useForm, FieldValues } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import cookie from 'js-cookie'
import { useAuth } from 'hooks/useAuth'

interface IForm {
    email: string
    password: string
}

interface ISignInRes {
    access_token: string
    refresh_token: string
    message: string
}

export default function AdminSignIn() {
    const { handleSubmit, register } = useForm<IForm>()
    const auth = useAuth()
    const navigate = useNavigate()

    const signUp = useMutation({
        mutationFn: async (data: FieldValues) => {
            const tokens = await api.post<ISignInRes>('admin/sign-in', data)
            return tokens.data
        },
        onSuccess: (tokens: ISignInRes) => {
            localStorage.setItem('access_token', tokens.access_token)
            cookie.set('refresh_token', tokens.refresh_token)
            auth?.setAuth(true)
            navigate('/admin/articles')
            toast.success(tokens.message)
        },
        onError: (err: Error) => {
            if (isAxiosError(err) && err.response) {
                toast.error(err.response.data.message)
            } else {
                navigate('/error')
            }
        }
    })

    return (
        <Wrapper>
            <Main>
                <Heading>Sign In</Heading>
                <form onSubmit={handleSubmit(data => signUp.mutate(data))}>
                    <Input
                        {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        placeholder='email'
                        type='mail'
                    />
                    <Input
                        {...register('password', { required: true, maxLength: 20 })}
                        placeholder='password'
                        type='password'
                    />
                    <Button text='Submit' />
                </form>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    height: 85vh;
`

const Main = styled.div`
    display: grid;
    justify-content: center;
    width: 600px;
    padding: 4rem;
`

const Heading = styled.h1`
    margin: 2rem 0;
    font-size: 2.5rem;
    text-align: center;
`

const Input = styled.input`
    background-color: transparent;
    outline: none !important;
    padding: 1rem;
    margin: 1rem 0;
    color: #e0e0e2;
    border: 1px solid gray;
    width: 100%;
    border-radius: 6px;
`
