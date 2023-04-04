import React from 'react'
import { editUser } from '@src/api/admin'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useInput from '@src/hooks/useInput'
import useToggle from '@src/hooks/useToggle'
import {
	Form,
	FormTitle,
	FormField,
	FormButtonContainer,
	FormRowContainer,
	FormCheckboxGroupField
} from '@src/ui/Form'
import { Button } from '@src/ui/Buttons'

const EditUserForm = (props) => {
	const { data } = { ...props }
	const { userProfile } = data
	if (!userProfile) return null

	const firstname = useInput(userProfile?.firstName || '')
	const lastname = useInput(userProfile?.lastName || '')
	const username = useInput(userProfile?.userName || '')
	const password = useInput('')
	const email = useInput(userProfile?.email || '')
	const isUser = useToggle(userProfile?.roles.includes('user') || false)
	const isModerator = useToggle(
		userProfile?.roles.includes('moderator') || false
	)
	const isAdmin = useToggle(userProfile?.roles.includes('admin') || false)

	async function handleSubmit(event) {
		event.preventDefault()
		const roles = []
		if (isUser.value) roles.push('user')
		if (isModerator.value) roles.push('moderator')
		if (isAdmin.value) roles.push('admin')

		try {
			const formData = {
				userProfile: {
					firstName: firstname.value,
					lastName: lastname.value,
					userName: username.value,
					email: email.value,
					roles: roles
				},
				password: password.value
			}
			const updatedUser = { ...data, ...formData }
			await editUser(updatedUser)
		} catch (error) {
			console.log(error)
		}
		props.handleClose()
	}

	return (
		<EditUserFormContainer>
			<Form>
				<FormTitle>Edit User</FormTitle>
				<FormRowContainer>
					<FormField
						type="text"
						placeholder="firstname"
						onChange={firstname.onChange}
						value={firstname.value}
					></FormField>
					<FormField
						type="text"
						placeholder="lastname"
						onChange={lastname.onChange}
						value={lastname.value}
					></FormField>
				</FormRowContainer>
				<FormCheckboxGroupField role="group" aria-labelledby="checkbox-group">
					<label>
						<input
							type="checkbox"
							checked={isUser.value}
							onChange={isUser.toggleValue}
						/>
						User
					</label>
					<label>
						<input
							type="checkbox"
							checked={isModerator.value}
							onChange={isModerator.toggleValue}
						/>
						Moderator
					</label>
					<label>
						<input
							type="checkbox"
							checked={isAdmin.value}
							onChange={isAdmin.toggleValue}
						/>
						Admin
					</label>
				</FormCheckboxGroupField>
				<FormField
					type="text"
					placeholder="username"
					onChange={username.onChange}
					value={username.value}
				></FormField>
				<FormField
					type="password"
					placeholder="password"
					onChange={password.onChange}
					value={password.value}
				></FormField>
				<FormField
					type="text"
					placeholder="email"
					onChange={email.onChange}
					value={email.value}
				></FormField>
				<FormButtonContainer>
					<Button type="button" color="secondary" onClick={props.handleClose}>
						Cancel
					</Button>
					<Button
						type="submit"
						color="primary"
						onClick={(event) => handleSubmit(event)}
					>
						Apply
					</Button>
				</FormButtonContainer>
			</Form>
		</EditUserFormContainer>
	)
}

export default EditUserForm

EditUserForm.propTypes = {
	data: PropTypes.object,
	handleClose: PropTypes.func
}

const EditUserFormContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`
