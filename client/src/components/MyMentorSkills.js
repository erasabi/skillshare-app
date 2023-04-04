import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import {
	getUser,
	selectUser,
	selectUserSkills,
	updateMentorSkills
} from '../redux/slices/userSlice'
import styled from 'styled-components'
import LoadingSpinner from '../ui/LoadingSpinner'

// list of current mentor skills
const Skills = (props) => {
	const { removeSkill } = props
	const skills = useSelector(selectUserSkills)
	// verify mentor skills is an array or set to empty array
	const skillList = skills.length >= 0 ? skills : []

	return skillList.map((skill) => (
		<SkillsWrapper key={`${skill}_container`}>
			<Skill key={`${skill}_skill`}>{skill}</Skill>
			<button
				key={skill}
				accessKey={skill}
				onClick={(e) => removeSkill(e.target.accessKey)}
			>
				X
			</button>
		</SkillsWrapper>
	))
}

Skills.propTypes = {
	removeSkill: PropTypes.func
}

const MyMentorSkills = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const inputSkill = useInput('')

	useEffect(() => {
		// gets user profile data (using this prevents errors on page refresh)
		if (!user.accountId) dispatch(getUser())
	}, [dispatch])

	if (user.isFetching) return <LoadingSpinner loading={user.isFetching} />

	// updates current mentor skills
	function updateSkills(updatedMentorProfile) {
		dispatch(updateMentorSkills(user.accountId, updatedMentorProfile))
		inputSkill.setValue('')
	}

	// adds skill to current mentor skills
	function addSkill(event) {
		// prevents the default Link transition from firing
		event.preventDefault()

		const updatedSkills = user.mentorProfile.skills.concat(inputSkill.value)
		const updatedMentorProfile = {
			...user?.mentorProfile,
			skills: updatedSkills
		}
		updateSkills(updatedMentorProfile)
	}

	// removes skill from current mentor sk ]';.ills
	function removeSkill(value) {
		const updatedSkills = user?.mentorProfile?.skills?.filter(
			(skill) => skill !== value
		)
		const updatedMentorProfile = {
			...user?.mentorProfile,
			skills: updatedSkills
		}
		updateSkills(updatedMentorProfile)
	}

	return (
		<MyMentorSkillsWrapper>
			<label>My Skills</label>
			<span className="input-bar">
				<Skills removeSkill={removeSkill} />
				<form onSubmit={(e) => addSkill(e)}>
					<input
						type="text"
						onChange={inputSkill.onChange}
						value={inputSkill.value}
					></input>
				</form>
			</span>
		</MyMentorSkillsWrapper>
	)
}

export default MyMentorSkills

const MyMentorSkillsWrapper = styled.div`
	background-color: ${(props) => props.theme.color.background.card};
	border-radius: 15px;
	color: ${(props) => props.theme.color.text.default};
	display: flex;
	flex-direction: column;
	grid-area: mySkills;
	height: 100%;
	justify-content: center;
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
		justify-content: space-between;
		padding: 0px 0;
		width: 100%;
	}
	.input-bar {
		align-items: center;
		border-color: #dcdcff;
		border-radius: 10px;
		border-style: solid;
		border-width: 1px;
		display: flex;
		flex-wrap: wrap;
		min-height: 55px;
		padding: 2px;
		& > form {
			max-width: 100%;
			& > input {
				background-color: ${(props) => props.theme.color.background.card};
				border-style: none;
				color: ${(props) => props.theme.color.text.default};
				height: 35px;
				outline: none;
				width: 100%;
			}
		}
	}
`

const SkillsWrapper = styled.div`
	align-items: center;
	display: flex;
	padding: 5px;
	&:hover {
		& > button {
			background-color: #ff6666;
			border-radius: 15%;
			color: white;
			display: block;
			height: 27px;
		}
	}
	& > button {
		display: none;
	}
`

const Skill = styled.div`
	background-color: #39598e;
	border-radius: 7%;
	color: white;
	padding: 5px 10px;
`
