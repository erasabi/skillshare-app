import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import PacmanLoader from 'react-spinners/PacmanLoader'

const LoadingSpinner = (props) => {
	const { theme, loading, size = 75 } = props
	return (
		<LoadingSpinnerContainer>
			<PacmanLoader color={theme.color.primary} loading={loading} size={size} />
			;
		</LoadingSpinnerContainer>
	)
}

LoadingSpinner.propTypes = {
	theme: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	size: PropTypes.number
}

export default withTheme(LoadingSpinner)

const LoadingSpinnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	justify-content: center;
	position: relative;
	top: 25%;
	width: 100%;
`
