import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { register } from '@src/redux/slices/authSlice'
import styled, { withTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useInput from '@src/hooks/useInput'
import { TextLink } from '@src/ui/Link'
import { Button } from '@src/ui/Buttons'
import {
	Form,
	FormField,
	FormButtonContainer,
	FormRowContainer
} from '@src/ui/Form'
import { ImageContainer } from '@src/ui/Image'

const Registration = (props) => {
	const { theme } = props
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const firstname = useInput('')
	const lastname = useInput('')
	const username = useInput('')
	const password = useInput('')
	const email = useInput('')

	function handleSubmit(event) {
		event.preventDefault()
		const formData = {
			firstname: firstname.value,
			lastname: lastname.value,
			username: username.value,
			password: password.value,
			email: email.value
		}
		dispatch(register(formData))
		navigate('/')
	}
	return (
		<RegistrationLayout>
			<Form>
				<ImageContainer>
					<img src={theme.logo} />
				</ImageContainer>
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
				<TextLink to="/login">Already have an account?</TextLink>
				<FormButtonContainer>
					<Button
						type="submit"
						color="primary"
						onClick={(event) => handleSubmit(event)}
					>
						Register
					</Button>
				</FormButtonContainer>
			</Form>
		</RegistrationLayout>
	)
}

Registration.propTypes = {
	theme: PropTypes.object.isRequired
}

export default withTheme(Registration)

const RegistrationLayout = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`
