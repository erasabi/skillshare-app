import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TextLink = styled(Link)`
	color: ${(props) => props.theme.color.text.link};
	padding: 5px;
`
