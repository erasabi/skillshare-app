import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@src/ui/Buttons'

export const ManageUsers = (props) => {
	const userProfiles = props.userProfiles

	const Panel = () => (
		<div>
			<div className="row">
				<Title>Users</Title>
			</div>
			<div className="row">
				<StyledTable>
					<thead>
						<StyledTr>
							<StyledTh>Account</StyledTh>
							<StyledTh>Username</StyledTh>
							<StyledTh>Roles</StyledTh>
							<StyledTh>Date Created</StyledTh>
							<StyledTh></StyledTh>
						</StyledTr>
					</thead>
					<StyledTbody>
						{userProfiles.map((result) => {
							return (
								<StyledTr key={result.id}>
									<StyledTd>{result.accountId}</StyledTd>
									<StyledTd>{result.userProfile.userName}</StyledTd>
									<StyledTd>{result.userProfile.roles.join(', ')}</StyledTd>
									<StyledTd>{result.createdAt.toLocaleString()}</StyledTd>
									<StyledTd>
										<Button
											color="primary"
											onClick={() => props.handleOnClick(result)}
										>
											edit
										</Button>
										<Button color="danger">delete</Button>
									</StyledTd>
								</StyledTr>
							)
						})}
					</StyledTbody>
				</StyledTable>
			</div>
		</div>
	)
	return <Panel />
}

ManageUsers.propTypes = {
	userProfiles: PropTypes.object,
	handleOnClick: PropTypes.func
}

// TABLE
const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  color: ${(props) => props.theme.color.text.default};
}`

// table css resource: https://www.w3schools.com/css/css_table.asp
const StyledTable = styled.table`
	border-collapse: collapse;
	font-family: Arial, Helvetica, sans-serif;
	width: 100%;
`

const StyledTh = styled.th`
	background-color: ${(props) => props.theme.color.background.table.head};
	color: white;
	padding-bottom: 12px;
	padding-top: 12px;
	text-align: center;
`

const StyledTbody = styled.tbody``

const StyledTr = styled.tr`
	background-color: ${(props) => props.theme.color.background.table.row};
	&:nth-child(even) {
		background-color: #f2f2f2;
	}
	&:hover {
		background-color: gray;
	}
`

const StyledTd = styled.td`
	border: 1px solid #ddd;
	text-align: center;
`
