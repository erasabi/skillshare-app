import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function getButtonBackgroundColor(props) {
	return (
		(props.color === 'primary' &&
			props.theme.color.background.button.primary) ||
		(props.color === 'secondary' &&
			props.theme.color.background.button.secondary) ||
		(props.color === 'danger' && props.theme.color.background.button.danger) ||
		(props.backgroundColor && props.backgroundColor) ||
		props.theme.color.background.button.primary
	)
}

function getButtonColor(props) {
	return (
		(props.color === 'primary' && props.theme.color.text.button.primary) ||
		(props.color === 'secondary' && props.theme.color.text.button.secondary) ||
		(props.color === 'danger' && props.theme.color.text.button.danger) ||
		(props.color && props.color) ||
		props.theme.color.text.button.primary
	)
}

export const Button = styled.button`
	&:hover {
		background-color: ${(props) => getButtonColor(props)};
		border: ${(props) => `1px solid ${getButtonBackgroundColor(props)}`};
		color: ${(props) => getButtonBackgroundColor(props)};
	}
	background-color: ${(props) => getButtonBackgroundColor(props)};
	border: none;
	border-radius: 7px;
	color: ${(props) => getButtonColor(props)};
	font-size: 18px;
	height: 45px;
	letter-spacing: 1px;
	padding: 0 15px;
`

export const ButtonsContainer = styled.div`
	align-items: center;
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	width: 100%;
`

export const IconButton = (props) => {
	return (
		<IconButtonContainer
			style={props.style}
			backgroundColor={props.backgroundColor}
		>
			<input type="image" src={props.iconSrc} onClick={props.onClick} />
		</IconButtonContainer>
	)
}

IconButton.propTypes = {
	iconSrc: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string,
	style: PropTypes.object
}

const IconButtonContainer = styled.button`
	background-color: ${(props) =>
		props.backgroundColor
			? props.backgroundColor
			: props.theme.color.background.button.primary};
	border: ${(props) => `2px solid ${props.theme.color.border}`};
	border-radius: 7px;
	& > input {
		height: ${(props) => props.height || '35px'};
	}
	height: 45px;
	padding: 0 15px;
`
