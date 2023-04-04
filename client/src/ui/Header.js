import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useToggle from '../hooks/useToggle'
import { selectAuthUser } from '../redux/slices/authSlice'
import { logout } from '../redux/slices/authSlice'
import { getUser, selectUser } from '../redux/slices/userSlice'
import { Button } from './Buttons'
import DarkModeSliderToggle from './DarkModeSliderToggle'
import { AvatarIcon } from './Icons'

const isAdmin = (roles = []) => roles.includes('ROLE_ADMIN')

const Header = (props) => {
	const location = useLocation()
	const userAuth = useSelector(selectAuthUser)
	const user = useSelector(selectUser)
	const showNavbar = useToggle(false)
	const dispatch = useDispatch()
	const headerRef = useRef()

	useEffect(() => {
		// gets user profile data (using this prevents errors on page refresh)
		if (user.isFetching) dispatch(getUser())
	}, [dispatch])

	useEffect(() => {
		// so we only proceed when dropdown is open
		if (!showNavbar.value) return

		// this ensures we dont double toggle by clicking document where
		// referenced element with onClick is located
		function handleClickOutside(event) {
			if (headerRef.current && !headerRef.current.contains(event.target)) {
				showNavbar.toggleValue()
			}
		}

		// if anywhere on document is clicked run function
		document.addEventListener('mousedown', handleClickOutside)
		// clean up event listener on useEffect completion
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [showNavbar.value])

	function showReportSnaphot() {
		return (
			location.pathname === '/profileSummary' ||
			location.pathname === '/profileMentee' ||
			location.pathname === '/profileMentor'
		)
	}

	return (
		<HeaderContainer style={props.style}>
			{showReportSnaphot() && (
				<Button backgroundColor="#53bb64">Generate Report</Button>
			)}
			<DarkModeSliderToggle />
			{/* ref must be here to stop outside click handler when clicking profile or dropdown */}
			<div ref={headerRef} onClick={showNavbar.toggleValue}>
				<AvatarIcon userId={user.accountId} />
				<StyledNav
					style={showNavbar.value ? { display: 'flex' } : { display: 'none' }}
				>
					<StyledLink to="mentorSearch">Search Skills</StyledLink>
					<StyledLink to="profileSummary">My Profile</StyledLink>
					{isAdmin(userAuth?.roles) && <StyledLink to="adminProfile">Admin</StyledLink>}
					{user ? (
						<StyledLink to="login" onClick={() => dispatch(logout())}>
							Sign Out
						</StyledLink>
					) : (
						<StyledLink to="login">Sign In</StyledLink>
					)}
				</StyledNav>
			</div>
		</HeaderContainer>
	)
}

Header.propTypes = {
	style: PropTypes.object
}

export default Header

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
	// background-color: ${(props) => props.theme.color.background.header};
	padding: 0px 15px;
	height: 70px;
	width: 100%;
`

const StyledLink = styled(Link)`
	font-family: system-ui;
	font-weight: 500;
	text-decoration: none;
	padding: 10px 20px;
	font-size: 22px;
	width: 200px;
	color: ${(props) => props.theme.color.text.navbar.default};
	// background-color: ${(props) =>
		props.theme.color.background.navbar.default};
	background-color: ${(props) => props.theme.color.background.card};
	&:hover {
		background-color: ${(props) => props.theme.color.background.navbar.hover};
		color: ${(props) => props.theme.color.text.navbar.hover};
	}
`

const StyledNav = styled.nav`
	align-items: center;
	background-color: ${(props) => props.theme.color.background.header};
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: absolute;
	right: 0px;
	top: 80px;
`
