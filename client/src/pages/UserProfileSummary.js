/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUser,
	selectUserProfile,
	selectUserAccountId
} from '@src/redux/slices/userSlice'
import styled from 'styled-components'
import Avatar from '@src/components/Avatar'
import ProgressBar from '@src/ui/ProgressBar'
import { FlexRow, FlexCol } from '@src/ui/Flex'
import { MentorBelt, NextBeltChart } from '@src/components/Belts'
import MyMentorSkills from '@src/components/MyMentorSkills'
import PieChart from '@src/components/PieChart'
import { MyNextAppointment } from '@src/components/MyAppointments'
import { isEmpty } from 'lodash'
import { openSidebar, closeSidebar } from '../redux/slices/sidebarSlice'

const UserProfileSummary = () => {
	const accountId = useSelector(selectUserAccountId)
	const user = useSelector(selectUserProfile)
	const dispatch = useDispatch()

	useEffect(() => {
		// gets user profile data (using this prevents errors on page refresh)
		if (isEmpty(user)) dispatch(getUser())
	}, [dispatch])

	useEffect(() => {
		dispatch(openSidebar())
		return () => {
			dispatch(closeSidebar())
		}
	}, [])

	return (
		<UserProfileSummaryLayout>
			{user && (
				<UserInfoLayout>
					<Avatar />
					<UserInfoContainer>
						<FlexRow>
							<div className="user-name">
								{user.firstName} {user.lastName}
							</div>
							{user.accountId && <MentorBelt accountId={user.accountId} />}
						</FlexRow>
						<FlexCol className="user-info">
							<span>
								{user.jobClassification}, {user.position}
							</span>
							<span>{user.locationStreet}</span>
							<span>{user.locationCity}</span>
							<span>
								{user.employeeId}, {user.email}
							</span>
							<LinkdInImg src={'/media/icons/LinkedinLogo.png'} />
						</FlexCol>
					</UserInfoContainer>
				</UserInfoLayout>
			)}
			<MyNextAppointment />
			<PieChart type="mentee" label="My Learning" gridArea="yourLearning" />
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
			<MyMentorSkills />
			{accountId && <NextBeltChart gridArea="nextBelt" accountId={accountId} />}
			<PieChart
				type="mentor"
				label="Teaching Sessions"
				gridArea="yourTeaching"
			/>
		</UserProfileSummaryLayout>
	)
}

export default UserProfileSummary

const UserInfoContainer = styled.div`
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 30%);
	color: ${(props) => props.theme.color.text.default};
	grid-area: userInfo;
	margin: 5px;
	padding: 20px;
`

const UserProfileSummaryLayout = styled.div`
	align-content: center;
	align-items: center;
	display: grid;
	gap: 10px;
	grid-template-areas:
		'userInfo userInfo userInfo userInfo .'
		'nextAppointment yourLearning achievments achievments achievments'
		'mySkills mySkills mySkills mySkills yourTeaching'
		'nextBelt nextBelt nextBelt nextBelt yourTeaching';
	grid-template-columns: repeat(5, 250px [col-start]);
	justify-content: center;
	padding-top: 10px;
	width: 100%;
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

const UserInfoLayout = styled.div`
	border-radius: 15px;
	display: grid;
	grid-area: userInfo;
	grid-template-areas: 'avatar userInfo userInfo .';
	width: 100%;

	${AchievementIcon} {
		margin-left: 10px;
	}

	.user-info {
		& > span {
			font-size: 20px;
			font-weight: 400;
		}
	}

	.user-name {
		font-size: 30px;
		font-weight: 500;
		margin: auto 0;
	}
`

const LinkdInImg = styled.img`
	width: 80px;
`
