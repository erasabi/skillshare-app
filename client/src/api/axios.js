import store from '@src/redux/store.js'
import { refreshToken } from '@src/api/auth.js'
import { logout, updateAuth } from '@src/redux/slices/authSlice'
import { API_ENDPOINT } from '@src/config'
import axios from 'axios'
/*
axios: Axios is a promise-based HTTP Client for node.js and the browser
	- based on Promise API (resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
	- all axios arguments: https://axios-http.com/docs/req_config
	- pros:
		- isomorphic [works in both browser and nodejs (server/client side) w/same code]
		- can intercept req/res
		- transform req/res data
		- cancel requests
		- auto-handles json data 
		- client side XSRF protection
	- cons:
		- not native so needs to be imported unlike fetch and other libraries
*/

// set default baseURL
axios.defaults.baseURL = API_ENDPOINT

// request interceptor: allow you to intercept requests and perform actions on them
//  - common use-cases:
//    - set request headers
axios.interceptors.request.use(
	(request) => {
		function setRequestHeaders() {
			const user = JSON.parse(localStorage.getItem('auth'))
			const headers = { 'Access-Control-Allow-Origin': '*' }

			if (user && user.accessToken) headers['x-access-token'] = user.accessToken
			return headers
		}

		request.headers = setRequestHeaders()
		return request
	},
	(error) => {
		Promise.reject(error)
	}
)

// response interceptor: allow you to intercept responses and perform actions on them
//  common use-cases:
//    - refesh expired token
//    - retry request
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		const user = JSON.parse(localStorage.getItem('auth'))
		function isExpiredJwt(token) {
			try {
				const decodedJwt = JSON.parse(atob(token.split('.')[1]))
				return decodedJwt.exp * 1000 < Date.now()
			} catch (e) {
				return null
			}
		}
		async function refreshTokenAndRetryRequest() {
			// create retry flag to make sure we stop after one refresh attempt
			originalRequest._retry = true
			// attempt refresh
			const { data } = await refreshToken(user.refreshToken)
			if (!data?.accessToken) return error
			// if successful, update localStorage and user state
			const updatedUser = { ...user, accessToken: data.accessToken }
			store.dispatch(updateAuth(updatedUser))
			console.log('TOKEN REFRESHED')
			// retry last request again
			axios.defaults.headers.common['x-access-token'] = updatedUser.accessToken

			return axios(originalRequest)
		}

		// if session token expired attempt to refresh it and retry the request
		if (error.response.status === 401 && !originalRequest._retry) {
			refreshTokenAndRetryRequest()
		}
		// logout if session token expired and refresh failed(refresh token also expired)
		else if (error.response.status !== 401 && isExpiredJwt(user?.accessToken)) {
			console.log('TOKEN REFRESH EXPIRED. LOGGING OUT')
			store.dispatch(logout())
			return error
		}
		return Promise.reject(error)
	}
)
