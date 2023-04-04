import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import MyMentorSkills from '@src/components/MyMentorSkills'
import MyAppointments from '@src/components/MyAppointments'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@src/redux/slices/userSlice'
import { Button } from '@src/ui/Buttons'
import PieChart from '@src/components/PieChart'
import { NextBeltChart } from '@src/components/Belts'
import { openSidebar, closeSidebar } from '@src/redux/slices/sidebarSlice'

// mock data for the bar chart
const hoursPerMonthMock = [
	{ hours: 13, colors: ['#ffd847', '#e0a106'] },
	{ hours: 20, colors: ['#ff47ab', '#e0064e'] },
	{ hours: 16, colors: ['#add9c0', '#1da890'] },
	{ hours: 30, colors: ['#cbd9ad', '#7ca81d'] },
	{ hours: 22, colors: ['#d9c1ad', '#714511'] }
]

const MentorProfile = () => {
	const user = useSelector(selectUser)
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
				<MyAppointments listProfile={'mentor'} />
			</MyAppointmentsContainer>
			<PieChart
				type="mentor"
				label="Teaching Sessions"
				gridArea="teachingSessions"
			/>
			<MonthlyHoursContainer>
				<label>Teaching Hours per Month</label>
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
			{user.mentorProfile && (
				<div
					style={{
						gridArea: 'myReviews'
					}}
				>
					<ReviewsWrapper>
						<label>Mentee Reviews</label>
						<div className="container-sublabel">Total Reviews: 13</div>
						<div className="rating-value">{user.mentorProfile.rating}</div>
						<div className="rating" style={{ width: '200px' }}>
							<div
								className="rating-star"
								style={{ width: (100 * user.mentorProfile.rating) / 5 + '%' }}
							></div>
						</div>
						<ButtonArrayContainer>
							<Button color="primary">Read Reviews</Button>
						</ButtonArrayContainer>
					</ReviewsWrapper>
				</div>
			)}
			<div style={{ gridArea: 'myMentorSkills' }}>
				<MyMentorSkills />
			</div>
			{user.accountId && (
				<NextBeltChart gridArea="myNextBelt" accountId={user.accountId} />
			)}
		</MentorProfileLayout>
	)
}

export default MentorProfile

const MentorProfileLayout = styled.div`
	align-content: center;
	align-items: center;
	display: grid;
	gap: 10px;
	grid-template-areas:
		'upcomingMeetings upcomingMeetings upcomingMeetings upcomingMeetings upcomingMeetings'
		'teachingSessions monthlyHours monthlyHours monthlyHours monthlyHours'
		'myMentorSkills myMentorSkills myMentorSkills myMentorSkills myReviews'
		'myNextBelt myNextBelt myNextBelt myNextBelt myReviews';
	grid-template-columns: repeat(5, 250px [col-start]);
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

const ReviewsWrapper = styled.div`
	grid-area: 'myReviews';
	background-color: ${(props) => props.theme.color.background.card};
	color: ${(props) => props.theme.color.text.default};
	height: 240px;
	padding: 15px;
	border-radius: 15px;
	width: 240px;
	& > label {
		font-family: system-ui;
		font-weight: 500;
		font-size: large;
	}
	.container-sublabel {
		color: #767676;
		padding-top: 10px;
	}
	.rating {
		background: url('/media/icons/fire_40_120.png') repeat-x 0 0;
		// width: 90px;
		height: 40px;
		display: block;
	}

	.rating-star {
		background: url('/media/icons/fire_40_120.png') repeat-x 0 -40px;
		height: 40px;
		display: block;
	}

	.rating-value {
		height: 60px;
		display: block;
		color: #e66f23;
		font-size: xxx-large;
	}
`

const ButtonArrayContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 10px;
`
