import axios from 'axios'

export const login = async (username, password) => {
	return await axios.post('/api/auth/signin', {
		username,
		password
	})
}

export const refreshToken = async (refreshToken) => {
	return await axios.post('/api/auth/refreshtoken', {
		refreshToken: refreshToken
	})
}

export const register = async (body) => {
	return await axios.post('/api/auth/signup', body)
}
