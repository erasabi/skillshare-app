import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

const userHasRole = (roles, requiredRole) => {
	return roles.indexOf(requiredRole) > -1 ? true : false
}

export function Auth({ children }) {
	let location = useLocation()

	const auth = JSON.parse(localStorage.getItem('auth'))
	// Redirect them to the /login page, but save the current location they were
	// trying to go to when they were redirected.
	if (!auth) return <Navigate to="login" state={{ from: location }} replace />

	return children
}

Auth.propTypes = {
	children: PropTypes.element
}

export function AuthAdmin({ children }) {
	const auth = JSON.parse(localStorage.getItem('auth'))
	// Redirect them to the /login page, but save the current location they were
	// trying to go to when they were redirected.
	if (!auth || (auth && !userHasRole(auth.roles, 'ROLE_ADMIN')))
		return <Navigate to="login" state={{ from: location }} replace />

	return children
}

AuthAdmin.propTypes = {
	auth: PropTypes.object,
	children: PropTypes.element
}
