import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { login } from '@src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import styled, { withTheme } from 'styled-components'
import { TextLink } from '@src/ui/Link'
import { Button } from '@src/ui/Buttons'
import useInput from '@src/hooks/useInput'
import { Form, FormField, FormButtonContainer } from '@src/ui/Form'
import { ImageContainer } from '@src/ui/Image'

const Login = (props) => {
	const { theme } = props
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const username = useInput('')
	const password = useInput('')

	function handleSubmit(event) {
		event.preventDefault()
		const formData = {
			username: username.value,
			password: password.value
		}
		dispatch(login(formData))
		navigate('/')
	}

	return (
		<LoginLayout>
			<Form>
				<ImageContainer>
					<img src={theme.logo} />
				</ImageContainer>
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
				<TextLink to="/registrationPage">Create account</TextLink>
				<FormButtonContainer>
					<Button
						type="submit"
						color="primary"
						onClick={(event) => handleSubmit(event)}
					>
						Login
					</Button>
				</FormButtonContainer>
			</Form>
		</LoginLayout>
	)
}

Login.propTypes = {
	theme: PropTypes.object.isRequired
}

export default withTheme(Login)

const LoginLayout = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`
