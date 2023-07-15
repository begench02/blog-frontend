import axios from 'axios'
import cookie from 'js-cookie'

const baseURL = 'http://localhost:8000/'

export const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config

        if (error.response.status === 401 && originalRequest.url === `${baseURL}admin/refresh-token`) {
            window.location.href = '/admin/login'
            return Promise.reject(error)
        }

        if (
            error.response.data.code === 'token not valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = cookie.get('refresh-cookie')

            if (refreshToken) {
                const access_token = (
                    await api.get<string>('/admin/refresh-token', { headers: { Authorization: refreshToken } })
                ).data
                localStorage.setItem('access_token', access_token)
                api.defaults.headers['Authorization'] = `Bearer ${access_token}`
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`

                return api(originalRequest)
            }
        } else {
            console.log('Refresh token not available')
            window.location.href = '/admin/login'
        }
    }
)
