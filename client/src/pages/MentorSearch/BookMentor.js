/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, IconButton } from '@src/ui/Buttons'
import { ButtonsContainer } from '@src/ui/Buttons'
import useInput from '@src/hooks/useInput'
import dateFormat from 'dateformat'

const BookMentor = (props) => {
	const { mentor, handleOnBook, handleClose } = props
	const message = useInput('')
	const bookingDate = useInput(null)
	const bookingSkill = useInput(null)

	useEffect(() => {
		bookingDate.setValue(mentor.availability[0].startTime)
		bookingSkill.setValue(mentor.mentorProfile.skills[0])
	}, [mentor])

	return (
		<BookMentorWrapper>
			<form>
				<h1>Book A Session</h1>
				<div className="row">
					<label className="form-select-label">Skill: </label>
					{bookingSkill.value && (
						<select
							className="form-select"
							value={bookingSkill.value}
							onChange={bookingSkill.onChange}
						>
							{mentor.mentorProfile.skills &&
								mentor.mentorProfile.skills.map((skill, index) => {
									return (
										<option key={index} value={skill}>
											{skill}
										</option>
									)
								})}
						</select>
					)}
				</div>
				<div className="row">
					<label className="form-select-label">Pick a Session: </label>
					{bookingDate.value && (
						<select
							className="form-select"
							value={bookingDate.value}
							onChange={bookingDate.onChange}
						>
							{mentor.availability &&
								mentor.availability.map((apt, index) => {
									return (
										<option key={index} value={apt.startTime}>
											{dateFormat(new Date(apt.startTime))}
										</option>
									)
								})}
						</select>
					)}
				</div>
				<div className="row">
					<label className="form-comment-label">Comments: </label>
					<textarea
						className="form-comment"
						onChange={message.onChange}
						placeholder="Looking forward to our session!"
						value={message.value}
					/>
				</div>
			</form>
			<ButtonsContainer>
				<Button color="secondary" onClick={(e) => handleClose(e)}>
					Cancel
				</Button>
				<IconButton
					iconSrc="/media/icons/send-icon-white.png"
					onClick={() =>
						handleOnBook(
							mentor,
							bookingSkill.value,
							bookingDate.value,
							message.value
						)
					}
				/>
			</ButtonsContainer>
		</BookMentorWrapper>
	)
}

BookMentor.propTypes = {
	mentor: PropTypes.object.isRequired,
	handleOnBook: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default BookMentor

const BookMentorWrapper = styled.div`
	align-items: center;
	background-color: white;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	height: 600px;
	justify-content: space-around;
	margin: 10vh auto;
	padding: 50px;
	width: 60%;

	h1 {
		font-size: 40px;
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 25px;
		height: 100%;
		justify-content: flex-start;
		width: 100%;
	}

	.form-select-label {
		font-size: 25px;
		font-weight: 500;
		margin: auto 0;
	}

	.form-comment-label {
		font-size: 25px;
		font-weight: 500;
	}

	.form-comment {
		border: 1px solid black;
		border-radius: 10px;
		font-size: 25px;
		gap: 10px;
		height: 90px;
		justify-content: flex-start;
		margin-left: 10px;
		padding: 10px;
		width: 70%;
	}

	.form-select {
		font-size: 25px;
		gap: 10px;
		height: 45px;
		justify-content: flex-start;
		margin: 10px;
		padding: 0 10px;
		width: 50%;
	}

	.row {
		display: flex;
		flex-direction: row;
	}
`
