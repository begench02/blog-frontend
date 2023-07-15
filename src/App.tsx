import styled from 'styled-components'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { adminPrivateRoutes, publicRoutes } from 'utils/routes'
import { ProtectedLayout } from 'components'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from 'hooks/useAuth'
import { Suspense } from 'react'
import spinner from 'assets/spinner.svg'

export const App = () => {
    const router = createBrowserRouter([
        ...publicRoutes,
        { element: <ProtectedLayout />, children: [...adminPrivateRoutes] }
    ])

    return (
        <Suspense
            fallback={
                <Spinner>
                    <img src={spinner} />
                </Spinner>
            }>
            <Container>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen />
            </Container>
        </Suspense>
    )
}

const Container = styled.div`
    width: 60%;
    margin: 3rem auto;
    a {
        color: ${props => props.theme.activeColor};
    }
`

const Spinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
