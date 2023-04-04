import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import styled from 'styled-components'
import { getMenteeStatistics, getMentorStatistics } from '../api/user'
import useInput from '../hooks/useInput'
const pieChartConfig = {
	style: {
		fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
		fontSize: '7px',
		fontWeight: '500',
		height: '200px',
		width: '200px'
	},
	defaultData: [{ title: '0 hrs', value: 10, color: 'coral' }],
	labelStyle: {
		fill: 'white',
		opacity: 0.75,
		pointerEvents: 'none'
	}
}

const StyledPieChart = (props) => {
	const { label, type, gridArea, radius } = props
	const dataBySkill = useInput(null)
	const totalHours = useInput(null)

	useEffect(() => {
		async function fetchStatistics(type) {
			let response
			try {
				if (type === 'mentee') response = await getMentorStatistics()
				else if (type === 'mentor') response = await getMenteeStatistics()

				const { data } = response
				totalHours.setValue(data.totalHours)
				dataBySkill.setValue(Object.values(data.dataBySkill))
			} catch (error) {
				console.log(error)
			}
		}

		fetchStatistics(type)
	}, [type])

	return (
		<PieChartWrapper gridArea={gridArea}>
			<label>{label}</label>
			<div className="container-sublabel">
				total hours: {totalHours.value || 0}
			</div>
			<PieChart
				style={pieChartConfig.style}
				data={
					isEmpty(dataBySkill.value)
						? pieChartConfig.defaultData
						: dataBySkill.value
				}
				segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
				// sets size of pie chart
				radius={radius - 6 || 44}
				viewBoxSize={[100, 100]}
				// lines instead of slices (pie becomes donut)
				// 1=biggest donut hole + 100=pie (no hole)
				lineWidth={80}
				rounded
				// enable animate on render
				animate
				label={({ dataEntry }) => `${dataEntry.title}`}
				labelPosition={100 - 75 / 2}
				// labelPosition={112}
				labelStyle={pieChartConfig.labelStyle}
				background="white"
			/>
		</PieChartWrapper>
	)
}

StyledPieChart.propTypes = {
	type: PropTypes.string.isRequired,
	gridArea: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	radius: PropTypes.number
}

export default StyledPieChart

const PieChartWrapper = styled.div`
	grid-area: ${(props) => props.gridArea};
	background-color: ${(props) => props.theme.color.background.card};
	color: ${(props) => props.theme.color.text.default};
	height: 275px;
	padding: 15px;
	border-radius: 15px;
	width: 250px;
	& > label {
		font-family: system-ui;
		font-weight: 500;
		font-size: large;
	}
	.container-sublabel {
		color: #767676;
	}
	.pie-chart: {
		fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
		fontSize: '7px',
		fontWeight: '500',
		height: '200px',
		width: '200px'
	}
`
