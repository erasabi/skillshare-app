import React, { useState, useEffect } from 'react'
import { getUserProfiles } from '@src/api/admin'
import { Modal } from '@src/ui/Modal'
import EditUserForm from './EditUserForm'
import { ManageUsers } from './ManageUsers'
import styled from 'styled-components'

const AdminPage = () => {
	const [userProfiles, setUserProfiles] = useState([])
	const [modal, setModal] = useState({
		show: false,
		data: {}
	})

	useEffect(() => {
		// create an async function to avoid using async above
		// reason: useEffect function argument should only return either
		//    - a function that returns nothing
		//    - a function to cleanup side affects
		// useEffect(async () => ... would instead return a Promise (bad!)
		const fetchData = async () => {
			const { data } = await getUserProfiles()
			setUserProfiles(data)
		}

		fetchData()
	}, [modal])

	return (
		<div>
			<Modal show={modal.show}>
				<EditUserForm
					data={modal.data}
					handleClose={() => setModal({ show: false, data: {} })}
				/>
			</Modal>
			<AdminPageContainer className="row">
				<MainContainer>
					<ManageUsers
						userProfiles={userProfiles}
						handleOnClick={(result) => setModal({ show: true, data: result })}
					/>
				</MainContainer>
			</AdminPageContainer>
		</div>
	)
}

export default AdminPage

const AdminPageContainer = styled.div`
	display: flex;
	flex-direction: row;
`

const MainContainer = styled.div`
	padding: 25px;
	width: 100%;
`
