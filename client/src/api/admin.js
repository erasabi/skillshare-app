import axios from 'axios'

export async function getUserProfiles() {
	try {
		return await axios.get('/api/users')
	} catch (error) {
		console.log(error);
		return []
	}
}

export async function editUser(body) {
	return await axios.post('/api/users/update', body)
}
