import api from '../common/api.js'

export const loginUser = async (
    login: string,
    password: string,
): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await api.post('/login', { login, password })
        return response.data
    } catch (error) {
        return null
    }
}
