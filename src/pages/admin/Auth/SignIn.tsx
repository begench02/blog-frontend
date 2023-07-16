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
import { useState } from 'react'
import Eye from 'assets/eye.svg'
import ClosedEye from 'assets/eye-closed.svg'

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
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IForm>()
    const auth = useAuth()
    const navigate = useNavigate()
    const [showPassword, changeShowPassword] = useState(false)

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
        <Main>
            <Heading>Sign In</Heading>
            <Form onSubmit={handleSubmit(data => signUp.mutate(data))}>
                {errors.email?.type === 'required' && <ErrorMessage>Email is required</ErrorMessage>}
                {errors.email?.type === 'pattern' && <ErrorMessage>Wrong email format</ErrorMessage>}
                <Input
                    {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    placeholder='email'
                    type='mail'
                />

                {errors.password?.type === 'required' && <ErrorMessage>Password is required</ErrorMessage>}
                {errors.password?.type === 'pattern' && (
                    <ErrorMessage>
                        Password should contain 6-16 characters, at least one number and at least one special character
                    </ErrorMessage>
                )}
                <PasswordInput>
                    <Input
                        {...register('password', {
                            required: true,
                            maxLength: 20,
                            pattern: /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/
                        })}
                        placeholder='password'
                        type={showPassword ? 'text' : 'password'}
                    />
                    <ShowPassword
                        src={showPassword ? ClosedEye : Eye}
                        onClick={() => changeShowPassword(prev => !prev)}
                    />
                </PasswordInput>
                <Button text='Submit' />
            </Form>
        </Main>
    )
}

const Main = styled.div`
    display: grid;
    justify-content: center;
    padding: 4rem;
`

const Heading = styled.h1`
    margin: 2rem 0;
    font-size: 2.5rem;
    text-align: center;
`

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    width: 30rem;
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

const PasswordInput = styled.div`
    position: relative;
`

const ShowPassword = styled.img`
    position: absolute;
    top: 30px;
    right: 20px;
    width: 20px;
    height: 25px;
    cursor: pointer;
`

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
`
