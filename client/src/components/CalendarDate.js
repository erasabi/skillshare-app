import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)
import isTomorrow from 'dayjs/plugin/isTomorrow'
dayjs.extend(isTomorrow)
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

const CalendarDate = (props) => {
	const { startTime, endTime } = props

	const AppointmentDateFormat = ({ startTime }) => {
		switch (true) {
			case dayjs(startTime).isToday():
				return <div className="day">Today</div>
			case dayjs(startTime).isTomorrow():
				return <div className="day">Tomorrow</div>
			case dayjs(startTime).diff(dayjs(new Date()), 'days') < 7 &&
				dayjs(startTime).diff(dayjs(new Date()), 'days') > 2:
				return <div className="day">{dayjs(startTime).format('dddd')}</div>
			default:
				return <div className="day">{dayjs(startTime).format('MMMM D')}</div>
		}
	}

	return (
		<CalendarDateWrapper style={{ minWidth: '150px' }}>
			<div className="appointment-date-time">
				<AppointmentDateFormat startTime={startTime} />
				<TimeRange>
					{dayjs(startTime).format('h:mm')}-{dayjs(endTime).format('h:mm A')}
				</TimeRange>
			</div>
		</CalendarDateWrapper>
	)
}

CalendarDate.propTypes = {
	startTime: PropTypes.instanceOf(Date),
	endTime: PropTypes.instanceOf(Date),
	tabSelected: PropTypes.string
}

export default CalendarDate

const TimeRange = styled.div`
	 {
		color: #5b5b5b;
		font-size: 15px;
		padding: 5px 0px;
		text-align: center;
	}
`
const CalendarDateWrapper = styled.div`
	.appointment-date-time {
		height: 100%;
		width: 140px;
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
		margin: auto;
		// color: #1d1c1c;
	}

	.empty {
		background-color: gray;
	}
`
