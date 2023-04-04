import React from 'react'
import styled from 'styled-components'

const PopularSkillsTiles = () => (
	<PopularSkillsTilesContainer>
		<div className="row1">
			<div className="tiles skill-1">
				<h2 className="skill-text">Python</h2>
			</div>
			<div className="tiles skill-2">
				<h2 className="skill-text">React</h2>
			</div>
			<div className="tiles skill-3">
				<h2 className="skill-text">Bash</h2>
			</div>
		</div>
		<div className="row2">
			<div className="tiles skill-4">
				<h2 className="skill-text">Communication</h2>
			</div>
			<div className="tiles skill-5">
				<h2 className="skill-text">Leadership</h2>
			</div>
			<div className="tiles skill-6">
				<h2 className="skill-text">Time Management</h2>
			</div>
			<div className="tiles skill-7">
				<h2 className="skill-text">Java</h2>
			</div>
		</div>
		<div className="row3">
			<div className="tiles skill-8">
				<h2 className="skill-text">Blockchain</h2>
			</div>
			<div className="tiles skill-9">
				<h2 className="skill-text">Data Analysis with Machine Learning</h2>
			</div>
		</div>
		<div className="row4">
			<div className="tiles skill-10">
				<h2 className="skill-text">Emotional Intelligence</h2>
			</div>
		</div>
	</PopularSkillsTilesContainer>
)

export default PopularSkillsTiles

const PopularSkillsTilesContainer = styled.div`
	grid-area: popularSkills;
	padding: 50px 25px;
	.skill-text {
		text-align: center;
		font-size: 1vw;
		color: white;
		font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: normal;
	}
	.tiles {
		padding: 5px;
		margin-top: 10px;
		height: 60px;
		border-radius: 3px;
		display: inline-block;
		margin-right: 0.5%;
	}
	.row1 {
		margin-left: 10%;
		margin-right: 9%;
	}
	.skill-1 {
		background-color: #348288;
		width: 35%;
	}
	.skill-2 {
		background-color: #3bccb9;
		width: 25%;
	}
	.skill-3 {
		background-color: #8f2ca8;
		width: 35%;
	}
	.row2 {
		margin-left: 5%;
		margin-right: 5%;
	}
	.skill-4 {
		background-color: #36d3eb;
		width: 25%;
	}
	.skill-5 {
		background-color: #07078c;
		width: 20%;
	}
	.skill-6 {
		background-color: #5b078c;
		width: 30%;
	}
	.skill-7 {
		background-color: #348288;
		width: 20%;
	}
	.row3 {
		margin-left: 10%;
		margin-right: 10%;
	}
	.skill-8 {
		background-color: #07078c;
		width: 49%;
	}
	.skill-9 {
		background-color: #36d3eb;
		width: 49%;
	}
	.row4 {
		margin-left: 30%;
		margin-right: 30%;
	}
	.skill-10 {
		background-color: #3bccb9;
		width: 100%;
	}
`
