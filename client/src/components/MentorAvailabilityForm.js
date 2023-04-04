import React from 'react'
import styled from 'styled-components'
import { Button } from '../ui/Buttons'
import useInput from '../hooks/useInput'
import { Form, FormField } from '../ui/Form'
import PropTypes from 'prop-types'
import { FlexCol, FlexRow } from '@src/ui/Flex'
import { ButtonsContainer } from '@src/ui/Buttons'
import { setAppointmentAvailability } from '../api/appointments'

const Repeat = {
	NONE: 'None',
	DAILY: 'Every Day',
	WEEKLY: 'Every Week',
	MONTHLY: 'Every Month',
	YEARLY: 'Every Year'
}

const MentorAvailabilityForm = (props) => {
	const start = useInput('')
	const end = useInput('')
	const repeat = useInput(Repeat.NONE)
	const endRepeat = useInput('')

	async function handleCancel(event) {
		event.preventDefault()
		props.onClose()
	}

	async function handleSubmit() {
		try {
			await setAppointmentAvailability(
				start.value,
				end.value,
				repeat.value,
				endRepeat.value
			)
			props.onClose()
		} catch (error) {
			console.log(error)
			props.onClose()
		}
	}

	return (
		<MentorAvailabilityFormContainer>
			<StyledForm>
				<FormTitle>Add Availability</FormTitle>
				<FlexRow>
					<FlexCol>
						<label>Starts</label>
						<FormField
							type="datetime-local"
							placeholder="starts"
							onChange={start.onChange}
							value={start.value}
						></FormField>
					</FlexCol>
					<FlexCol>
						<label>Ends</label>
						<FormField
							type="datetime-local"
							placeholder="ends"
							onChange={end.onChange}
							value={end.value}
						></FormField>
					</FlexCol>
				</FlexRow>
				<FlexRow>
					<label>Repeat: </label>
					<select value={repeat.value} onChange={repeat.onChange}>
						<option value={Repeat.NONE}>{Repeat.NONE}</option>;
						<option value={Repeat.DAILY}>{Repeat.DAILY}</option>;
						<option value={Repeat.WEEKLY}>{Repeat.WEEKLY}</option>;
						<option value={Repeat.MONTHLY}>{Repeat.MONTHLY}</option>;
					</select>
				</FlexRow>
				{repeat.value !== Repeat.NONE && (
					<FlexRow>
						<FlexCol>
							<label>End Repeat</label>
							<FormField
								type="date"
								onChange={endRepeat.onChange}
								value={endRepeat.value}
							></FormField>
						</FlexCol>
					</FlexRow>
				)}
				<ButtonsContainer>
					<Button color="secondary" onClick={(e) => handleCancel(e)}>
						Cancel
					</Button>
					<Button color="primary" onClick={(e) => handleSubmit(e)}>
						Submit
					</Button>
				</ButtonsContainer>
			</StyledForm>
		</MentorAvailabilityFormContainer>
	)
}

MentorAvailabilityForm.propTypes = {
	onClose: PropTypes.func
}

export default MentorAvailabilityForm

const StyledForm = styled(Form)`
	align-items: flex-start;
	gap: 20px;
	margin: auto auto;
	min-width: 100px;
	width: fit-content;
`
const MentorAvailabilityFormContainer = styled.div`
	display: flex;
	height: 75%;
`
const FormTitle = styled.div`
	color: ${(props) => props.theme.color.text.default};
	font-size: large;
	font-weight: 500;
`
