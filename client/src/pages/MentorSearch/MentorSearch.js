import { useState } from 'react'
import PropTypes from 'prop-types'
import { getMentors } from '@src/api/user'
import styled, { withTheme } from 'styled-components'
import Modal from '@src/ui/Modal'
import useInput from '@src/hooks/useInput'
import useToggle from '@src/hooks/useToggle'
import { bookAppointment } from '@src/api/appointments'
import BookMentor from './BookMentor'
import MentorSearchResults from './MentorSearchResults'
import React from 'react'
import PopularSkillsTiles from './PopularSkillsTiles'
import MentorSearchForm from './MentorSearchForm'

const MentorSearch = (props) => {
	const { theme } = props
	const searchValue = useInput('')
	const [searchResults, setSearchResults] = useState([])
	const showModal = useToggle(false)
	const mentor = useInput(null)

	async function searchMentors() {
		try {
			const { data } = await getMentors(searchValue.value)
			const newSearchResults = data || searchResults || []
			setSearchResults(
				newSearchResults.filter((result) => result.availability.length > 0)
			)
		} catch (error) {
			console.log(error)
		}
	}

	function handleClose(event) {
		event.preventDefault()
		showModal.toggleValue()
	}

	function handleOnClick(result) {
		mentor.setValue(result)
		showModal.toggleValue()
	}

	async function handleOnBook(mentor, skill, bookingDate, message) {
		await bookAppointment(mentor.accountId, skill, bookingDate, message)
		await searchMentors()
		showModal.toggleValue()
	}

	return (
		<>
			<Grid>
				<Logo src={theme.logo} />
				<MentorSearchForm
					searchValue={searchValue}
					onSearch={searchMentors}
					setSearchResults={setSearchResults}
				/>
				{!(searchResults.length > 0) && <PopularSkillsTiles />}
				{searchResults && (
					<MentorSearchResults
						searchResults={searchResults}
						handleOnClick={handleOnClick}
					/>
				)}
			</Grid>
			{mentor.value && (
				<Modal show={showModal.value}>
					<BookMentor
						handleClose={handleClose}
						handleOnBook={handleOnBook}
						mentor={mentor.value}
					/>
				</Modal>
			)}
		</>
	)
}

MentorSearch.propTypes = {
	theme: PropTypes.object.isRequired
}

export default withTheme(MentorSearch)

const Grid = styled.div`
	display: grid;
	grid-template-areas:
		'logo logo'
		'searchbar searchbar'
		'popularSkills popularSkills'
		'searchResults searchResults';
	padding: 0 10%;
`

const Logo = styled.img`
	grid-area: logo;
	height: 250px;
	margin: 0 auto;
`
