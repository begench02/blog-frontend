import AdminNewArticle from 'pages/admin/AdminNewArticle'
import { lazy } from 'react'

// Public routes
const Error = lazy(() => import('pages/error/Error'))
const NotFount = lazy(() => import('pages/error/NotFound'))
const Articles = lazy(() => import('pages/user/articles/Articles'))
const Article = lazy(() => import('pages/user/articles/Article'))
const AdminSignIn = lazy(() => import('pages/admin/Auth/SignIn'))

// Private routes
const AdminArticles = lazy(() => import('pages/admin/AdminArticles'))
const AdminArticle = lazy(() => import('pages/admin/AdminArticle'))

export const publicRoutes: any = [
    {
        path: '*',
        element: <NotFount />
    },
    {
        path: '/error',
        element: <Error />
    },
    {
        path: '',
        element: <Articles />
    },
    {
        path: '/articles/:id',
        element: <Article />
    },
    {
        path: '/admin/sign-in',
        element: <AdminSignIn />
    }
]

export const adminPrivateRoutes = [
    {
        path: '/admin/articles',
        element: <AdminArticles />
    },
    {
        path: '/admin/articles/article/:id',
        element: <AdminArticle />
    },
    {
        path: '/admin/articles/article/new',
        element: <AdminNewArticle />
    }
]
