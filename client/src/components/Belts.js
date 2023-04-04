import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { getTotalMentorHours } from '../api/user'
import ProgressBar from '../ui/ProgressBar'

const beltSrcs = {
	white: '/media/icons/belts/white.png',
	yellow: '/media/icons/belts/yellow.png',
	orange: '/media/icons/belts/orange.png',
	green: '/media/icons/belts/green.png',
	purple: '/media/icons/belts/purple.png',
	brown: '/media/icons/belts/brown.png',
	black: '/media/icons/belts/black.png'
}

function getCurrentBeltData(mentorHours) {
	switch (true) {
		case mentorHours >= 5 && mentorHours < 25:
			return beltSrcs['white']
		case mentorHours >= 25 && mentorHours < 50:
			return beltSrcs['yellow']
		case mentorHours >= 50 && mentorHours < 100:
			return beltSrcs['orange']
		case mentorHours >= 100 && mentorHours < 250:
			return beltSrcs['green']
		case mentorHours >= 250 && mentorHours < 500:
			return beltSrcs['purple']
		case mentorHours >= 500 && mentorHours < 1000:
			return beltSrcs['brown']
		case mentorHours >= 1000:
			return beltSrcs['black']
		default:
			return null
	}
}

function getNextBeltData(mentorHours) {
	const nextBelt = {}
	let nextBeltHours

	switch (true) {
		case mentorHours >= 0 && mentorHours < 5:
			nextBelt.belt = beltSrcs['white']
			nextBelt.color = 'black'
			nextBelt.type = 'White Belt'
			nextBelt.description = ''
			nextBeltHours = mentorHours - 0
			nextBelt.ratio = `${nextBeltHours}/5hrs`
			nextBelt.progress = 100 * (mentorHours / 5)
			return nextBelt
		case mentorHours >= 5 && mentorHours < 25:
			nextBelt.belt = beltSrcs['yellow']
			nextBelt.color = '#e8dd00'
			nextBelt.type = 'Yellow Belt'
			nextBelt.description = ''
			nextBeltHours = mentorHours - 5
			nextBelt.ratio = `${nextBeltHours}/20hrs`
			nextBelt.progress = 100 * (nextBeltHours / (25 - 5))
			return nextBelt
		case mentorHours >= 25 && mentorHours < 50:
			nextBelt.belt = beltSrcs['orange']
			nextBelt.color = '#fe9d0c'
			nextBelt.type = 'Orange Belt'
			nextBelt.description = 'orange'
			nextBeltHours = mentorHours - 25
			nextBelt.ratio = `${nextBeltHours}/25hrs`
			nextBelt.progress = 100 * (nextBeltHours / (50 - 25))
			return nextBelt
		case mentorHours >= 50 && mentorHours < 100:
			nextBelt.belt = beltSrcs['green']
			nextBelt.color = '#4caf50'
			nextBelt.type = 'Green Belt'
			nextBelt.description = 'green'
			nextBeltHours = mentorHours - 50
			nextBelt.ratio = `${nextBeltHours}/50hrs`
			nextBelt.progress = 100 * (nextBeltHours / (100 - 50))
			return nextBelt
		case mentorHours >= 100 && mentorHours < 250:
			nextBelt.belt = beltSrcs['purple']
			nextBelt.color = '#753fd4'
			nextBelt.type = 'Purple Belt'
			nextBelt.description = ''
			nextBeltHours = mentorHours - 250
			nextBelt.ratio = `${nextBeltHours}/150hrs`
			nextBelt.progress = 100 * (nextBeltHours / (250 - 100))
			return nextBelt
		case mentorHours >= 250 && mentorHours < 500:
			nextBelt.belt = beltSrcs['brown']
			nextBelt.color = 'brown'
			nextBelt.type = 'Brown Belt'
			nextBelt.description = ''
			nextBeltHours = mentorHours - 250
			nextBelt.ratio = `${nextBeltHours}/250hrs`
			nextBelt.progress = 100 * (nextBeltHours / (500 - 250))
			return nextBelt
		case mentorHours >= 500 && mentorHours < 1000:
			nextBelt.belt = beltSrcs['black']
			nextBelt.color = '#464646'
			nextBelt.type = 'Black Belt'
			nextBelt.description = 'highest rank; grand master mentor'
			nextBeltHours = mentorHours - 500
			nextBelt.ratio = `${nextBeltHours}/500hrs`
			nextBelt.progress = 100 * (nextBeltHours / (1000 - 500))
			return nextBelt
		case mentorHours >= 1000:
			nextBelt.belt = beltSrcs['black']
			nextBelt.progress = 100
			return nextBelt
	}
}

export const MentorBelt = (props) => {
	const { accountId } = props
	const totalHours = useInput(null)

	useEffect(() => {
		async function fetchData() {
			const { data } = await getTotalMentorHours(accountId)
			totalHours.setValue(data)
		}
		fetchData()
	}, [accountId])

	return totalHours.value ? (
		<BeltIcon backgroundUrl={getCurrentBeltData(totalHours.value)} />
	) : null
}

MentorBelt.propTypes = { accountId: PropTypes.string }

export const NextBeltChart = (props) => {
	const totalHours = useInput(null)

	useEffect(() => {
		async function fetchData() {
			const { data } = await getTotalMentorHours(props.accountId)
			totalHours.setValue(data.toString())
		}
		fetchData()
	}, [props.accountId])

	return (
		<NextBeltChartWrapper gridArea={props.gridArea}>
			<label>Next Belt</label>
			{totalHours.value && (
				<NextBeltProgress totalMentorHours={totalHours.value} />
			)}
		</NextBeltChartWrapper>
	)
}

NextBeltChart.propTypes = {
	gridArea: PropTypes.string,
	accountId: PropTypes.string
}

const NextBeltProgress = (props) => {
	const { totalMentorHours } = props
	const mentorHours = Number(totalMentorHours)
	const { belt, type, description, color, progress, ratio } =
		getNextBeltData(mentorHours)

	return (
		<div className="container">
			<BeltIcon backgroundUrl={belt} />
			<div className="col">
				<div className="row">
					<label>{type}</label>
					<span>{description}</span>
				</div>
				<div className="row">
					<ProgressBar bgcolor={color} completed={progress} />
					<span>{ratio}</span>
				</div>
			</div>
		</div>
	)
}

NextBeltProgress.propTypes = {
	totalMentorHours: PropTypes.string
}

const BeltIcon = styled.div`
	background: url(${(props) =>
			props.backgroundUrl ||
			'https://cdn-icons.flaticon.com/png/128/2977/premium/2977897.png?token=exp=1644318746~hmac=2644a10e1458dc81e5ba9658a34cd644'})
		no-repeat;
	background-size: contain;
	height: 45px;
	margin: auto 0;
	margin-left: 5px;
	padding-right: 5px;
	width: 45px;
`

const NextBeltChartWrapper = styled.div`
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.default};
	display: flex;
	flex-direction: column;
	grid-area: ${(props) => props.gridArea};
	height: 125px;
	padding: 10px;
	width: 100%;
	& > label {
		font-family: system-ui;
		font-size: large;
		font-weight: 500;
		padding: 5px;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		justify-content: space-between;
		padding: 0px 0;
		width: 100%;
	}

	.row {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 20px;
		& > label {
			font-family: system-ui;
			font-size: medium;
			font-weight: 300;
		}
		& > span {
			font-family: system-ui;
			font-size: small;
			font-weight: 200;
			padding: 0 5px;
		}
	}

	.col {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		padding: 0 15px;
		width: 100%;
	}
`
