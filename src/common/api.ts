import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_ENV == 'prod' ? 'https://xnturniej.online' : 'http://localhost:3000',
    timeout: 10000,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token != undefined) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error cases
        if (error.response && error.response.status === 401) {
            // Redirect to login or refresh token
        }
        return Promise.reject(error)
    },
)

export default api
