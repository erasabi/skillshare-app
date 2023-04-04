/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
	getUser,
	selectUser,
	selectDarkModeEnabled,
	updateUser
} from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const DarkModeSliderToggle = (props) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const enableDarkMode = useSelector(selectDarkModeEnabled)

	function handleDarkMode(event) {
		event.preventDefault()
		const updatedUser = { ...user, darkModeEnabled: !enableDarkMode }
		dispatch(updateUser(updatedUser))
	}

	useEffect(() => {
		// gets user profile data (using this prevents errors on page refresh)
		if (user.isFetching) dispatch(getUser())
	}, [dispatch])

	return (
		<SliderToggleWrapper onClick={(e) => handleDarkMode(e)}>
			{enableDarkMode !== undefined && (
				<SliderContainer enableDarkMode={enableDarkMode}>
					<div className={enableDarkMode ? 'moon' : 'sun'} />
				</SliderContainer>
			)}
		</SliderToggleWrapper>
	)
}

DarkModeSliderToggle.propTypes = {
	handleDarkMode: PropTypes.func,
	enableDarkMode: PropTypes.bool
}

export default DarkModeSliderToggle

const SliderContainer = styled.div`
	margin: 0 auto;
	// change size of toggle with font-size
	font-size: 2.5px;
	position: relative;
	height: 16em;
	width: 30em;
	border-radius: 10em;
	transition: all 500ms ease-in-out;
	background: ${(props) => (props.enableDarkMode ? '#423966' : '#FFBF71')};
`

const SliderToggleWrapper = styled.div`
	.day {
		background: #ffbf71;
	}
	.moon {
		background: #423966;
		border-radius: 50%;
		box-shadow: 3em 2.5em 0 0em #d9fbff inset,
			rgba(255, 255, 255, 0.1) 0em -7em 0 -4.5em,
			rgba(255, 255, 255, 0.1) 3em 7em 0 -4.5em,
			rgba(255, 255, 255, 0.1) 2em 13em 0 -4em,
			rgba(255, 255, 255, 0.1) 6em 2em 0 -4.1em,
			rgba(255, 255, 255, 0.1) 8em 8em 0 -4.5em,
			rgba(255, 255, 255, 0.1) 6em 13em 0 -4.5em,
			rgba(255, 255, 255, 0.1) -4em 7em 0 -4.5em,
			rgba(255, 255, 255, 0.1) -1em 10em 0 -4.5em;
		display: block;

		height: 10em;
		left: 3em;
		position: absolute;
		top: 3em;
		transform: rotate(-75deg);
		transition: all 400ms ease-in-out;
		width: 10em;
	}
	.sun {
		background: #fff;
		border-radius: 50%;
		box-shadow: 3em 3em 0 5em #fff inset, 0 -5em 0 -2.7em #fff,
			3.5em -3.5em 0 -3em #fff, 5em 0 0 -2.7em #fff, 3.5em 3.5em 0 -3em #fff,
			0 5em 0 -2.7em #fff, -3.5em 3.5em 0 -3em #fff, -5em 0 0 -2.7em #fff,
			-3.5em -3.5em 0 -3em #fff;
		display: block;

		height: 7em;
		left: 18em;
		position: absolute;
		top: 4.5em;
		transform: rotate(0deg);
		transition: all 400ms ease-in-out;
		width: 7em;
	}
`
