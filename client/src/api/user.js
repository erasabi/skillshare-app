import axios from 'axios'
import { toast } from 'react-toastify'

export async function getUserProfile(id) {
	return await axios.get(`/api/users/${id}`)
}

export async function setUserAvatar(accountId, formData) {
	let toastId = null
	const config = {
		onUploadProgress: (p) => {
			const progress = p.loaded / p.total
			if (toastId === null) {
				toastId = toast('Upload in Progress', {
					progress
				})
			} else {
				toast.update(toastId, {
					progress
				})
			}
		}
	}

	const response = await axios.post(
		'/api/users/profile/image/' + accountId,
		formData,
		{ headers: config }
	)
	toast.dismiss(toastId)
	return response
}

export async function setMentorProfile(body) {
	return await axios.post('/api/mentors/profile', body)
}

export async function setUserById(updatedUser) {
	const { accountId } = updatedUser
	const body = updatedUser

	return await axios.post(`/api/users/${accountId}`, body)
}

export async function getMenteeStatistics() {
	return await axios.get(`/api/users/statistics/mentee`)
}

export async function getMentors(skill) {
	const body = {
		skills: skill
	}
	return await axios.post(`/api/mentors/search`, body)
}

export async function getMentorStatistics() {
	return await axios.get(`/api/users/statistics/mentor`)
}

export async function getTotalMenteeHours(accountId) {
	const body = {
		type: 'mentee',
		id: accountId
	}
	return await axios.post(`/api/users/totalhours`, body)
}

export async function getTotalMentorHours(accountId) {
	const body = {
		type: 'mentor',
		id: accountId
	}
	return await axios.post(`/api/users/totalhours`, body)
}
