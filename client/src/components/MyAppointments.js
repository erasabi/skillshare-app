/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FlexRow, FlexCol } from '@src/ui/Flex'
import { Button } from '../ui/Buttons'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import {
	getAppointmentsList,
	acceptAppointment,
	denyAppointment,
	cancelAppointment
} from '../api/appointments'
import MentorAvailabilityManager from '../components/MentorAvailabilityManager'
import CalendarDate from '../components/CalendarDate'
import { AvatarIcon } from '../ui/Icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Rating from './Rating'
import { getUserProfile } from '../api/user'
dayjs.extend(relativeTime)

const AppointmentInfoTile = (props) => {
	const { appointment, tabSelected, listProfile, handleOnClick } = props
	const { accountId, attendeeId, skill, status } = appointment
	const startTime = new Date(appointment.startTime)
	const endTime = new Date(appointment.endTime)
	const attendeeData = useInput(null)

	async function fetchData() {
		let partnerData = null
		if (tabSelected !== 'available') {
			const id = listProfile === 'mentee' ? accountId : attendeeId
			const { data } = await getUserProfile(id)
			partnerData = data
		}
		attendeeData.setValue(partnerData)
	}

	useEffect(() => {
		fetchData()
	}, [appointment])

	async function onClickAccept() {
		await acceptAppointment(startTime, 'test accept message')
		handleOnClick()
	}

	async function onClickDecline() {
		await denyAppointment(startTime, 'test decline message')
		handleOnClick()
	}

	async function onClickCancel() {
		await cancelAppointment(
			appointment.attendeeId,
			startTime,
			'test cancel message'
		)
		handleOnClick()
	}

	const AppointmentStatus = ({ status }) => {
		switch (status) {
			case 'approved':
				return (
					<FlexRow>
						<div className="dot accepted"></div>
						<div className="status">Accepted</div>
					</FlexRow>
				)
			case 'pending':
				return (
					<FlexRow>
						<div className="dot pending"></div>
						<div className="status" style={{ fontSize: '16px' }}>
							Pending Confirmation
						</div>
					</FlexRow>
				)
			case 'denied':
				return (
					<FlexRow>
						<div className="dot pending"></div>
						<div className="status" style={{ fontSize: '16px' }}>
							Denied
						</div>
					</FlexRow>
				)
			case 'cancelled':
				return (
					<FlexRow>
						<div className="dot pending"></div>
						<div className="status" style={{ fontSize: '16px' }}>
							Cancelled
						</div>
					</FlexRow>
				)
			default:
				return null
		}
	}

	const AppointmentStartsInTile = ({ startTime }) => {
		switch (true) {
			case dayjs(startTime).diff(dayjs(new Date()), 'hours') > 24:
				return (
					<div className="starts-in more-day">{dayjs(startTime).fromNow()}</div>
				)
			case dayjs(startTime).diff(dayjs(new Date()), 'hours') < 12:
				return (
					<div className="starts-in less-12hr">
						{dayjs(startTime).fromNow()}
					</div>
				)
			case dayjs(startTime).diff(dayjs(new Date()), 'hours') >= 12 &&
				dayjs(startTime).diff(dayjs(new Date()), 'hours') <= 24:
				return (
					<div className="starts-in less-day">{dayjs(startTime).fromNow()}</div>
				)
			default:
				return null
		}
	}

	if (tabSelected === 'available')
		return (
			<AppointmentInfoTileWrapper>
				<CalendarDate
					tabSelected={tabSelected}
					startTime={startTime}
					endTime={endTime}
				/>
				<AvatarIcon userId={accountId} />
			</AppointmentInfoTileWrapper>
		)

	return (
		<AppointmentInfoTileWrapper>
			<CalendarDate
				tabSelected={tabSelected}
				startTime={startTime}
				endTime={endTime}
			/>
			{attendeeData.value && (
				<FlexRow style={{ minWidth: '350px' }}>
					<AvatarIcon userId={attendeeData.value.accountId} />
					<FlexCol style={{ justifyContent: 'center', padding: '0px 5px' }}>
						<div className="invitee">
							{attendeeData.value.firstName} {attendeeData.value.lastName}
						</div>
						<div className="skill">{skill}</div>
					</FlexCol>
				</FlexRow>
			)}
			{tabSelected === 'history' && listProfile === 'mentee' && (
				<>
					<Rating />
					<ButtonArrayContainer>
						<Button color="primary">Add feedback</Button>
						<Button color="danger">Submit</Button>
					</ButtonArrayContainer>
				</>
			)}
			{tabSelected === 'upcoming' && (
				<>
					<div style={{ minWidth: '220px' }}>
						<AppointmentStartsInTile startTime={startTime} />
					</div>
					<div style={{ minWidth: '240px' }}>
						<AppointmentStatus status={status} />
					</div>
					<ButtonArrayContainer>
						{status === 'pending' && listProfile === 'mentor' ? (
							<>
								<Button color="primary" onClick={onClickAccept}>
									accept
								</Button>
								<Button color="secondary" onClick={onClickDecline}>
									decline
								</Button>
							</>
						) : (
							<Button color="danger" onClick={onClickCancel}>
								cancel
							</Button>
						)}
					</ButtonArrayContainer>
				</>
			)}
		</AppointmentInfoTileWrapper>
	)
}

AppointmentInfoTile.propTypes = {
	appointment: PropTypes.object,
	tabSelected: PropTypes.string
}

const MyAppointments = (props) => {
	const { listProfile } = props
	const tabSelected = useInput('upcoming')
	const appointmentsList = useInput(null)

	async function fetchData(listProfile, listType) {
		const { data } = await getAppointmentsList(listProfile, listType)
		const updatedList = data.length > 0 ? data : null
		appointmentsList.setValue(updatedList)
	}

	useEffect(() => {
		fetchData(listProfile, tabSelected.value).catch(console.error)
	}, [tabSelected.value])

	function onTabSelect(selectedTab) {
		tabSelected.setValue(selectedTab)
	}

	function handleOnClick() {
		fetchData(listProfile, tabSelected.value).catch(console.error)
	}

	return (
		<div>
			<Title>My Appointments</Title>
			<ApptOptions>
				<AppointmentsTab
					isSelected={tabSelected.value === 'upcoming'}
					onClick={() => onTabSelect('upcoming')}
				>
					Upcoming
				</AppointmentsTab>
				<AppointmentsTab
					isSelected={tabSelected.value === 'history'}
					onClick={() => onTabSelect('history')}
				>
					History
				</AppointmentsTab>
				{listProfile === 'mentor' && (
					<AppointmentsTab
						isSelected={tabSelected.value === 'available'}
						onClick={() => onTabSelect('available')}
					>
						Available
					</AppointmentsTab>
				)}
			</ApptOptions>
			<AppointmentsListContainer>
				{tabSelected.value === 'available' && <MentorAvailabilityManager />}
				<AppointmentInfoTilesContainer>
					{appointmentsList.value ? (
						appointmentsList.value.map((appointment, index) => {
							return (
								<AppointmentInfoTile
									key={index}
									appointment={appointment}
									tabSelected={tabSelected.value}
									listProfile={listProfile}
									handleOnClick={handleOnClick}
								/>
							)
						})
					) : (
						<NoAppointmentsFound>No Appointments Found</NoAppointmentsFound>
					)}
				</AppointmentInfoTilesContainer>
			</AppointmentsListContainer>
		</div>
	)
}

MyAppointments.propTypes = {
	appointments: PropTypes.array,
	listProfile: PropTypes.string
}

export const MyNextAppointment = () => {
	const listProfile = 'mentee'
	const tabSelected = useInput('upcoming')
	const appointmentsList = useInput(null)

	async function fetchData(listProfile, listType) {
		const { data } = await getAppointmentsList(listProfile, listType)
		const updatedList = data.length > 0 ? data : null
		appointmentsList.setValue(updatedList)
	}

	useEffect(() => {
		fetchData(listProfile, tabSelected.value).catch(console.error)
	}, [tabSelected.value])

	const AppointmentDateFormat = ({ startTime }) => {
		switch (true) {
			case dayjs(startTime).isToday():
				return <div className="day">Today</div>
			case dayjs(startTime).isTomorrow():
				return <div className="day">Tomorrow</div>
			default:
				return <div className="day">{dayjs(startTime).fromNow()}</div>
		}
	}
	return (
		<NextAppointmentWrapper>
			<label>Your Next Appointment</label>
			{appointmentsList.value ? (
				<>
					<div className="container-sublabel day-of-week">
						{dayjs(appointmentsList.value[0].startTime).format('dddd')}
					</div>
					<div className="row day-month-row">
						<div className="day-of-month">
							{dayjs(appointmentsList.value[0].startTime).format('D')}
						</div>
						<div className="month">
							{dayjs(appointmentsList.value[0].startTime).format('MMMM')}
						</div>
					</div>
					<div className="day-relative">
						<AppointmentDateFormat
							startTime={appointmentsList.value[0].startTime}
						/>
					</div>
					<div className="row calendar-info">
						<div className="col">
							<div>{appointmentsList.value[0].skill}</div>
							<div>
								{dayjs(appointmentsList.value[0].startTime).format('h:mm')}-
								{dayjs(appointmentsList.value[0].endTime).format('h:mm A')}
							</div>
						</div>
					</div>
				</>
			) : (
				<NoAppointmentsFound>No Appointments Found</NoAppointmentsFound>
			)}
		</NextAppointmentWrapper>
	)
}

export default MyAppointments

const AppointmentInfoTileWrapper = styled.div`
	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.color.background.card};
	color: ${(props) => props.theme.color.text.default};
	height: 75px;
	padding: 5px 15px;
	border-radius: 15px;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 30%);
	gap: 10px;
	// width: 1250px;

	.appointment-date-time {
		height: 55px;
		width: 130px;
		border-radius: 7px;
		border: 1px solid #2c2c2c;
		background-color: white;
	}

	.day {
		height: 22px;
		font-size: 18px;
		color: white;
		background-color: #ff6666;
		text-align: center;
		border-radius: 5px 5px 0px 0px;
	}

	.time {
		padding: 5px 0px;
		text-align: center;
		color: #5b5b5b;
		font-size: 14px;
	}

	.starts-in {
		text-align: center;
		color: white;
		font-size: 18px;
		padding: 10px;
		border-radius: 7px;
	}

	.more-day {
		background-color: #4e4eed;
	}

	.skill {
		// padding-left: 20px;
		font-size: 18px;
		font-weight: 400;
		width: max-content;
	}

	.invitee {
		font-size: 20px;
		font-weight: 500;
	}

	.image {
		height: 50px;
		width: 50px;
		object-fit: cover;
		border-radius: 50%;
	}

	.dot {
		height: 10px;
		width: 10px;
		object-fit: cover;
		border-radius: 50%;
		margin: auto 5px auto 10px;
	}

	.accepted {
		background: green;
	}

	.pending {
		background: red;
	}

	.type {
		margin: auto;
		font-size: 15px;
		font-weight: 400;
		color: #4d4848;
	}

	.less-12hr {
		background-color: #f96262;
	}

	.less-day {
		background-color: orange;
	}

	.status {
		font-size: 16px;
		// margin: auto;
		// color: #1d1c1c;
	}

	.empty {
		background-color: gray;
	}
`

const AppointmentsListContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;
`

const ButtonArrayContainer = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	width: 100%;
`

const AppointmentInfoTilesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	color: ${(props) => props.theme.color.text.default};
	// overflow-y: handling overflow
	// 	- auto: scrollbar that hides when no overflow
	overflow-y: auto; // handling overflow
	// max-height: (y limit to trigger overflow)
	max-height: 250px;
	padding: 0 10px 10px 10px;
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

const Title = styled.div`
	color: ${(props) => props.theme.color.text.default};
	font-size: large;
	font-weight: 500;
`

const ApptOptions = styled.div`
	color: ${(props) => props.theme.color.text.default};
	display: flex;
	gap: 10px;
	margin-left: 20px;
	margin-top: 10px;
	width: 400px;

	.upcoming {
		font-weight: 600;
		text-decoration-color: red;
		text-decoration-line: underline;
		text-decoration-thickness: 3px;
		text-underline-offset: 5px;
	}

	.history {
		color: gray;
		padding-left: 20px;
	}
`

const AppointmentsTab = styled.div`
	color: ${(props) =>
		props.isSelected ? props.theme.color.text.default : 'gray'};
	font-weight: ${(props) => (props.isSelected ? '500' : '200')};
	padding: 7px 0px;
`

const NoAppointmentsFound = styled.div`
	align-items: center;
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.default};
	display: flex;
	flex-direction: column;
	font-size: 30px;
	font-weight: 200;
	height: 100px;
	justify-content: center;
	padding: 10px;
	width: 100%;
`
const NextAppointmentWrapper = styled.div`
	grid-area: nextAppointment;
	// margin: 10px;
	background-color: ${(props) => props.theme.color.background.card};
	color: ${(props) => props.theme.color.text.default};
	height: 275px;
	padding: 15px;
	border-radius: 15px;

	& > label {
		font-family: system-ui;
		font-weight: 500;
		font-size: large;
	}

	.day-month-row {
		height: 70px;
	}

	.day-of-week {
		color: #767676;
		font-size: 20px;
		padding: 5px 0;
	}
	.day-of-month {
		font-size: 70px;
		color: red;
	}
	.month {
		margin-top: auto;
		padding: 0 5px;
		font-size: 20px;
	}
	.day-relative {
		font-size: 20px;
		padding: 5px 0;
	}

	.calendar-info {
		background-color: #a3a3f9;
		color: white;
		font-size: 18px;
		padding: 5px;
		border-radius: 5px;
	}
	.row {
		display: flex;
		flex-direction: row;
		// align-items: center;
		// height: 20px;
	}

	.col {
		display: flex;
		flex-direction: column;
		// justify-content: center;
	}
`
