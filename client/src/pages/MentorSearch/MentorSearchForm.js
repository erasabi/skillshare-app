/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { IconButton } from '@src/ui/Buttons'
import React from 'react'

const MentorSearchForm = (props) => {
	async function handleChange(event) {
		event.preventDefault()
		props.onSearch()
	}

	return (
		<SearchBarContainer>
			<SearchForm onSubmit={(event) => handleChange(event)}>
				<SearchBar
					type="search"
					placeholder="search a skill"
					onChange={props.searchValue.onChange}
					value={props.searchValue.value}
				/>
				<IconButton
					style={{ height: '50px' }}
					iconSrc="/media/icons/search-icon-white.png"
					onClick={() => {}}
				/>
			</SearchForm>
		</SearchBarContainer>
	)
}

export default MentorSearchForm

const SearchBarContainer = styled.div`
	grid-area: searchbar;
`

const SearchForm = styled.form`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
`

const SearchBar = styled.input`
	border-radius: 7px;
	height: 50px;
	padding-left: 5px;
	width: 90%;
`
