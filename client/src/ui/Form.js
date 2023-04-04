import styled from 'styled-components'

export const Form = styled.form`
	background-color: ${(props) => props.theme.color.background.form};
	border-radius: 7px;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 30%);
	display: flex;
	flex-direction: column;
	gap: 5px;
	min-width: 50%;
	padding: 25px 50px;
`

export const FormTitle = styled.div`
	color: #484848;
	font-family: system-ui;
	font-size: 30px;
	padding: 15px 0px;
`

export const FormField = styled.input`
	border-radius: 7px;
	height: 50px;
	padding-left: 5px;
	width: 100%;
`

export const FormCheckboxGroupField = styled.div`
	padding: 5px;
	& > label {
		color: ${(props) => props.theme.color.text.default};
	}
`

export const FormButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	justify-content: flex-end;
	padding: 10px 0px;
`

export const FormRowContainer = styled.div`
	display: flex;
	gap: 10px;
`
