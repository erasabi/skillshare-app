import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { openSidebar, closeSidebar } from '../redux/slices/sidebarSlice'
import PieChart from '@src/components/PieChart'
import MyAppointments from '@src/components/MyAppointments'
import ProgressBar from '@src/ui/ProgressBar'

// mock data for the bar chart
const hoursPerMonthMock = [
	{ hours: 13, colors: ['#ffd847', '#e0a106'] },
	{ hours: 20, colors: ['#ff47ab', '#e0064e'] },
	{ hours: 16, colors: ['#add9c0', '#1da890'] },
	{ hours: 30, colors: ['#cbd9ad', '#7ca81d'] },
	{ hours: 22, colors: ['#d9c1ad', '#714511'] }
]

const MenteeProfile = () => {
	const mockMonths = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(openSidebar())
		return () => {
			dispatch(closeSidebar())
		}
	}, [])

	return (
		<MentorProfileLayout>
			<MyAppointmentsContainer>
				<MyAppointments listProfile={'mentee'} />
			</MyAppointmentsContainer>
			<PieChart type="mentee" label="My Learning" gridArea="teachingSessions" />
			<MonthlyHoursContainer>
				<label>Learning Hours per Month</label>
				<MonthlyHours>
					{hoursPerMonthMock.map(({ hours, colors }, i) => {
						return (
							<BarChartContainer key={i}>
								<Number color={colors[1]}>{hours}</Number>
								<MakeBar height={hours * 5} colors={colors} />
								<BlackLine></BlackLine>
								<div className="container-sublabel">{mockMonths[i]}</div>
							</BarChartContainer>
						)
					})}
				</MonthlyHours>
			</MonthlyHoursContainer>
			<AchievementsWrapper>
				<label>Achievments</label>
				<div className="container">
					<AchievementIcon backgroundUrl="https://img.icons8.com/external-justicon-flat-justicon/2x/external-award-reward-and-badges-justicon-flat-justicon-1.png"></AchievementIcon>
					<div className="col">
						<div className="row">
							<label>Wildfire</label>
							<span>maintain 3 different sets of skills</span>
						</div>
						<div className="row">
							<ProgressBar bgcolor={'#000f56'} completed={30} />
							<span>70%</span>
						</div>
					</div>
				</div>
				<div className="container">
					<AchievementIcon backgroundUrl="https://cdn-icons-png.flaticon.com/128/1694/1694364.png"></AchievementIcon>
					<div className="col">
						<div className="row">
							<label>Champion</label>
							<span>maintain 5 sessions of Storytelling</span>
						</div>
						<div className="row">
							<ProgressBar bgcolor={'#ff6cd8'} completed={50} />
							<span>50%</span>
						</div>
					</div>
				</div>
				<div className="container">
					<AchievementIcon backgroundUrl="https://cdn-icons-png.flaticon.com/128/1170/1170611.png"></AchievementIcon>
					<div className="col">
						<div className="row">
							<label>Overachiever</label>
							<span>maintain 10-hr sessions this month</span>
						</div>
						<div className="row">
							<ProgressBar bgcolor={'#ff9800'} completed={67} />
							<span>33%</span>
						</div>
					</div>
				</div>
				<div className="container">
					<AchievementIcon backgroundUrl="https://cdn-icons-png.flaticon.com/128/3529/3529912.png"></AchievementIcon>
					<div className="col">
						<div className="row">
							<label>Graduate I</label>
							<span>maintain 56 hour streak</span>
						</div>
						<div className="row">
							<ProgressBar bgcolor={'#3d8ef3'} completed={56} />
							<span>34%</span>
						</div>
					</div>
				</div>
			</AchievementsWrapper>
		</MentorProfileLayout>
	)
}

export default MenteeProfile

const MentorProfileLayout = styled.div`
	align-content: center;
	align-items: center;
	display: grid;
	gap: 10px;
	grid-template-areas:
		'upcomingMeetings upcomingMeetings upcomingMeetings'
		'teachingSessions monthlyHours monthlyHours'
		'achievments achievments achievments';
	justify-content: center;
`

const MyAppointmentsContainer = styled.div`
	grid-area: upcomingMeetings;
`

const MonthlyHoursContainer = styled.div`
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.default};
	grid-area: 'monthlyHours';
	height: 275px;
	padding: 15px;
	width: 1000px;
	& > label {
		font-family: system-ui;
		font-size: large;
		font-weight: 500;
	}
	.container-sublabel {
		color: #767676;
	}
`

const MonthlyHours = styled.div`
	display: flex;
`

const BarChartContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`

const Chart = css`
	margin-top: 10px;
	width: 56px;
	&:hover {
		opacity: 0.8;
	}
	@media (max-width: 420px) {
		width: 34px;
	}
`

const Number = styled.span`
	color: ${(props) => props.color};
	font-size: 1.5rem;
	text-align: center;
`

const MakeBar = styled.div`
	background-image: linear-gradient(
		to bottom,
		${(props) => props.colors[0]},
		${(props) => props.colors[1]}
	);
	height: ${(props) => props.height}px;
	${Chart};
`

const BlackLine = styled.div`
	background-color: grey;
	height: 1px;
	width: 170px;
`

const AchievementsWrapper = styled.div`
	grid-area: achievments;
	// margin: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	background-color: ${(props) => props.theme.color.background.card};
	color: ${(props) => props.theme.color.text.default};
	height: 275px;
	min-width: 600px;
	padding: 0 15px 15px 15px;
	border-radius: 15px;
	& > label {
		padding: 5px;
		font-family: system-ui;
		font-weight: 500;
		font-size: large;
	}

	.container {
		padding: 0px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// width: 400px;
	}

	.icon-achievement {
		margin: auto 0;
		background: url(${(props) =>
				props.backgroundUrl ||
				'https://cdn-icons.flaticon.com/png/128/2977/premium/2977897.png?token=exp=1644318746~hmac=2644a10e1458dc81e5ba9658a34cd644'})
			no-repeat;
		padding-right: 5px;
		width: 45px;
		height: 45px;
		background-size: contain;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		// width: 350px;
		height: 20px;
		& > label {
			font-family: system-ui;
			font-weight: 300;
			font-size: medium;
		}
		& > span {
			padding: 0 5px;
			font-family: system-ui;
			font-weight: 200;
			font-size: small;
		}
	}
	.col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
`

const AchievementIcon = styled.div`
	background: url(${(props) =>
			props.backgroundUrl ||
			'https://cdn-icons.flaticon.com/png/128/2977/premium/2977897.png?token=exp=1644318746~hmac=2644a10e1458dc81e5ba9658a34cd644'})
		no-repeat;
	background-size: contain;
	height: 45px;
	margin: auto 0;
	padding-right: 5px;
	width: 45px;
`
