import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@src/ui/Buttons'
import { MentorBelt } from '@src/components/Belts'
import CalendarDate from '@src/components/CalendarDate'
import { AvatarIcon } from '@src/ui/Icons'
import styled from 'styled-components'

const MentorSearchResults = (props) => {
	const { searchResults } = props

	const MentorSearchResults =
		searchResults &&
		searchResults.map((result) => {
			const {
				accountId,
				userName,
				firstName,
				lastName,
				email,
				mentorProfile,
				availability
			} = result

			return (
				<StyledCard key={accountId}>
					<CardItemsContainer className="row">
						<TextImageAlign>
							<CardItemContainer>
								<AvatarIcon userId={accountId} />
							</CardItemContainer>
							<CardItemContainer>
								<TextImageAlign>
									<CardUsername>{userName}</CardUsername>
									<MentorBelt accountId={accountId} />
								</TextImageAlign>
								<div>
									{lastName}, {firstName}
								</div>
								<div>{email}</div>
							</CardItemContainer>
						</TextImageAlign>
						<div className="rating" style={{ width: '90px' }}>
							<div
								className="rating-star"
								style={{ width: (100 * mentorProfile.rating) / 5 + '%' }}
							></div>
						</div>
						<div className="mentor-skills">
							<div className="available-appointments">
								{mentorProfile.skills.map((value) => (
									<div className="one-skill" key={value} value={value}>
										{value}
									</div>
								))}
							</div>
						</div>
						{availability.slice(0, 3).map((apt) => (
							<CalendarDate
								key={apt.id}
								tabSelected={'upcoming'}
								startTime={new Date(apt.startTime)}
								endTime={new Date(apt.endTime)}
							/>
						))}
						<Button
							backgroundColor="#9fabff"
							onClick={() => props.handleOnClick(result)}
						>
							Book
						</Button>
					</CardItemsContainer>
				</StyledCard>
			)
		})
	return MentorSearchResults ? (
		<StyledResults>{MentorSearchResults}</StyledResults>
	) : null
}

MentorSearchResults.propTypes = {
	searchResults: PropTypes.array,
	handleOnClick: PropTypes.func
}

export default MentorSearchResults

const StyledResults = styled.div`
	grid-area: searchResults;
`

const StyledCard = styled.div`
	background-color: #f3feff;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 30%);
	margin: 10px 0px;
	padding: 10px 20px;
	position: relative;
`

const CardItemsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	.rating {
		background: url('/media/icons/fire_rating.png') repeat-x 0 0;
		width: 90px;
		height: 18px;
		display: block;
	}

	.rating-star {
		background: url('/media/icons/fire_rating.png') repeat-x 0 -18px;
		height: 18px;
		display: block;
	}

	.available-appointment {
		margin: 0px 5px;
		height: 90px;
		width: 100px;
		border-radius: 7px;
		border: 1px solid #2c2c2c;
		background-color: white;
	}

	.one-skill {
		width: fit-content;
		background-color: #39598e;
		color: white;
		padding: 5px 10px;
		margin: 0px 1px;
		border-radius: 7px;
	}

	.mentor-skills {
		flex-grow: 1;
		flex-basis: 0;
		text-align: center;
		margin-bottom: auto;
		margin-top: auto;
		padding: 10px;
		font-size: 20px;
	}

	.available-appointments {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		flex-basis: 0;
		justify-content: center;
	}

	.day {
		height: 25px;
		background-color: #ff6666;
		text-align: center;
		color: white;
		font-size: 20px;
		border-radius: 5px 5px 0px 0px;
	}

	.time {
		// height: 60px;
		padding: 15px 0px;
		text-align: center;
		color: #5b5b5b;
		font-size: 20px;
	}
`

const CardItemContainer = styled.div`
	margin-bottom: auto;
	margin-top: auto;
	padding: 10px;
`

const TextImageAlign = styled.div`
	align-items: center;
	display: flex;
`

const CardUsername = styled.div`
	padding-right: 0px;
`
