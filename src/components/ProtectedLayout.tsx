import { useAuth } from 'hooks/useAuth'
import { useOutlet, Navigate } from 'react-router-dom'

export default function ProtectedLayout() {
    const auth = useAuth()
    const outlet = useOutlet()

    if (!auth?.isAuth) return <Navigate to='/admin/sign-in' />

    return outlet
}
