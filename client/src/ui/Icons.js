import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { API_ENDPOINT } from '@src/config'

export function AvatarIcon({ style, userId }) {
	return (
		<>
			{userId && (
				<ProfileIcon
					style={style}
					src={
						`${API_ENDPOINT}/api/users/profile/avatar/` +
						userId +
						'?' +
						new Date().getTime()
					}
					onError={(e) => {
						e.target.src = '/media/blank-profile-picture.png'
					}}
				/>
			)}
		</>
	)
}

AvatarIcon.propTypes = {
	userId: PropTypes.string,
	style: PropTypes.object
}

const ProfileIcon = styled.img`
	border-radius: 50%;
	height: 65px;
	object-fit: cover;
	width: 65px;
`
