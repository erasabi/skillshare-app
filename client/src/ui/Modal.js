import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const Modal = (props) => {
	const { show, children } = props
	return (
		<ModalContainer style={show ? { display: 'block' } : { display: 'none' }}>
			<ModalChildContainer>{children}</ModalChildContainer>
		</ModalContainer>
	)
}

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired,
	handleClose: PropTypes.func
}

export default Modal

const ModalContainer = styled('div')`
	background: rgba(0, 0, 0, 0.6);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000;
`

const ModalChildContainer = styled.div`
	background: rgba(0, 0, 0, 0.6);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
`
