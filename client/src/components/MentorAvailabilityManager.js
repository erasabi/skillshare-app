import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { FlexRow, FlexCol } from '@src/ui/Flex'
import { IconButton } from '../ui/Buttons'
import Modal from '../ui/Modal'
import MentorAvailabilityForm from './MentorAvailabilityForm'
import useToggle from '../hooks/useToggle'
import { getUser, selectUser } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import dateFormat from 'dateformat'

const AvailabilitySettings = (props) => {
	const { availability } = props
	if (!availability) return null

	function getAvailabilitySetting(setting) {
		const { startTime, endRepeat, repeat } = setting

		switch (repeat) {
			case 'Every Day':
				return `${dateFormat(
					new Date(startTime),
					'"Every day at" h:MMtt'
				)} until ${dateFormat(new Date(endRepeat), 'mmm dS yyyy')}`
			case 'Every Week':
				return `${dateFormat(
					new Date(startTime),
					'"Every" ddd "at" h:MMtt'
				)} until ${dateFormat(new Date(endRepeat), 'mmm dS yyyy')}`
			case 'Every Month':
				return `${dateFormat(
					new Date(startTime),
					'"Every" dS "at" h:MMtt'
				)} until ${dateFormat(new Date(endRepeat), 'mmm dS yyyy')}`
		}
	}

	return availability.map((setting) => {
		return (
			<AvailabilityTimeRange key={setting.startTime}>
				<div>{getAvailabilitySetting(setting)}</div>
			</AvailabilityTimeRange>
		)
	})
}

AvailabilitySettings.propTypes = {
	availability: PropTypes.array
}

const MentorAvailabilityManager = (props) => {
	const { theme } = props
	const showModal = useToggle(false)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user.accountId) dispatch(getUser())
	}, [dispatch])

	useEffect(() => {
		console.log(showModal.value)
	})

	return (
		<MentorAvailabilityManagerContainer>
			<label>Availability Settings</label>
			<ListColumn>
				{user && <AvailabilitySettings availability={user.appointments} />}
				<IconButton
					style={{ border: 'none' }}
					backgroundColor={theme.color.background.default}
					iconSrc="/media/icons/plus-add-icon.png"
					onClick={showModal.toggleValue}
				/>
			</ListColumn>
			<Modal show={showModal.value}>
				<MentorAvailabilityForm onClose={showModal.toggleValue} />
			</Modal>
		</MentorAvailabilityManagerContainer>
	)
}

MentorAvailabilityManager.propTypes = {
	theme: PropTypes.object
}

export default withTheme(MentorAvailabilityManager)

const MentorAvailabilityManagerContainer = styled.div`
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.default};
	height: 250px;
	padding: 15px;
	width: 500px;
	& > label {
		font-family: system-ui;
		font-size: medium;
		font-weight: 500;
	}
`

const AvailabilityTimeRange = styled(FlexRow)`
	align-items: center;
	background-color: ${(props) => props.theme.color.background.button.primary};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.button.primary};
	display: flex;
	flex-direction: row;
	gap: 5px;
	justify-content: center;
	padding: 5px 10px;
`

const ListColumn = styled(FlexCol)`
	gap: 5px;
	padding: 10px 5px;
	// overflow-y: handling overflow
	// 	- auto: scrollbar that hides when no overflow
	overflow-y: auto; // handling overflow
	// max-height: (y limit to trigger overflow)
	max-height: 200px;
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		width: 5px;
		height: 15px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${(props) => props.theme.color.scrollbar};
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
	}
`
