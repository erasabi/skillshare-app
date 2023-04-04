import axios from 'axios'

export async function setAppointmentAvailability(
	startTime,
	endTime,
	repeat,
	endRepeat
) {
	const body = {
		startTime: new Date(startTime).toUTCString(),
		endTime: new Date(endTime).toUTCString(),
		repeat: repeat,
		endRepeat: new Date(endRepeat).toUTCString()
	}
	return await axios.post(`/api/users/availability`, body)
}

export async function getAppointmentsList(listProfile, listType) {
	const body = {
		listProfile: listProfile,
		listType: listType
	}
	return await axios.post(`/api/users/appointments`, body)
}

export async function bookAppointment(
	mentorAccountId,
	skill,
	startTime,
	menteeMessage
) {
	const body = {
		accountId: mentorAccountId,
		skill: skill,
		startTime: new Date(startTime).toUTCString(),
		message: menteeMessage
	}
	return await axios.post(`/api/users/appointments/book`, body)
}

export async function acceptAppointment(startTime, message) {
	const body = {
		startTime: new Date(startTime).toUTCString(),
		message: message
	}
	return await axios.post(`/api/users/appointments/accept`, body)
}

export async function denyAppointment(startTime, message) {
	const body = {
		startTime: new Date(startTime).toUTCString(),
		message: message
	}
	return await axios.post(`/api/users/appointments/deny`, body)
}

export async function cancelAppointment(attendeeId, startTime, message) {
	const body = {
		attendeeId: attendeeId,
		startTime: startTime,
		message: message
	}
	return await axios.post(`/api/users/appointments/cancel`, body)
}
