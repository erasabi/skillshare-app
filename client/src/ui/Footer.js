import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { API_ENDPOINT } from '@src/config'

const Footer = ({ style }) => {
	return (
		<FooterWrapper style={style}>
			<a href={API_ENDPOINT}>
				<Logo src={'/media/logo-singleline.png'} />
			</a>
		</FooterWrapper>
	)
}

Footer.propTypes = {
	style: PropTypes.object
}

export default Footer

const FooterWrapper = styled.div`
	background-image: ${(props) => props.theme.color.background.footer};
	height: 50px;
	padding: 7px;
	width: 100%;
`

const Logo = styled.img`
	height: 30px;
`
