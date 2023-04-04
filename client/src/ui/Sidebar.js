import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ style }) => {
	const navigate = useNavigate()
	const tabSelected = useInput('summary')

	function onTabSelect(value) {
		tabSelected.setValue(value)
		switch (value) {
			case 'summary':
				navigate('/profileSummary')
				break
			case 'mentee':
				navigate('/profileMentee')
				break
			case 'mentor':
				navigate('/profileMentor')
				break
		}
	}

	return (
		<SidebarContainer style={style}>
			<TabWrapper
				isSelected={tabSelected.value === 'summary'}
				onClick={() => onTabSelect('summary')}
			>
				Summary
			</TabWrapper>
			<TabWrapper
				isSelected={tabSelected.value === 'mentee'}
				onClick={() => onTabSelect('mentee')}
			>
				Mentee Profile
			</TabWrapper>
			<TabWrapper
				isSelected={tabSelected.value === 'mentor'}
				onClick={() => onTabSelect('mentor')}
			>
				Mentor Profile
			</TabWrapper>
			<LowerSidebar />
		</SidebarContainer>
	)
}

Sidebar.propTypes = {
	style: PropTypes.object
}

export default Sidebar

const SidebarContainer = styled.div`
	display: ${(props) => (props.show ? 'block' : 'none')}
	padding: 0px;
	width: 210px;
	&::-webkit-scrollbar {
		width: 0;
	}
	& > div {
		display: block;
		font-size: 24px;
		padding: 5px 10px;
	}
`

const TabWrapper = styled.div`
	&:hover {
		background-color: ${(props) => props.theme.color.background.card};
	}
	background-color: ${(props) =>
		props.isSelected ? props.theme.color.background.card : 'none'};
	border-bottom: ${(props) =>
		props.isSelected ? '2px solid  #c700a0' : 'none'};
	border-left: ${(props) => (props.isSelected ? '2px solid  #c700a0' : 'none')};
	border-right: ${(props) =>
		props.isSelected ? 'none' : '1px solid  #c700a0'};
	border-top: ${(props) => (props.isSelected ? '2px solid  #c700a0' : 'none')};
	color: ${(props) =>
		props.isSelected ? props.theme.color.text.navbar.default : '#9cb2d6'};
	font-weight: ${(props) => (props.isSelected ? '500' : '200')};
	width: inherit;
`

const LowerSidebar = styled.div`
	border-right: 1px solid #c700a0;
	height: 100%;
	width: inherit;
`
