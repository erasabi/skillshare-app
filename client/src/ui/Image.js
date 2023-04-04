import styled from 'styled-components'

export const ImageContainer = styled.div`
	text-align: center;
	& > img {
		max-height: ${(props) => props.maxHeight || '250px'};
	}
`
