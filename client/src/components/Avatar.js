/* eslint-disable no-unused-vars */
// Drag-Drop Feature Resources
//   - example-code: https://github.com/uzochukwueddie/react-dropzone
//   - code-explained: https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { setUserAvatar } from '../api/user'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, selectUser, updateUser } from '../redux/slices/userSlice'
import { AvatarIcon } from '../ui/Icons'

const Avatar = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const fileInputRef = useRef()
	const modalImageRef = useRef()
	const modalRef = useRef()
	const [selectedFiles, setSelectedFiles] = useState([])
	const [validFiles, setValidFiles] = useState([])

	useEffect(() => {
		let filteredArr = selectedFiles.reduce((acc, current) => {
			const res = acc.find((item) => item.name === current.name)
			if (!res) {
				return acc.concat([current])
			} else {
				return acc
			}
		}, [])
		filteredArr[0] ? openImageModal(filteredArr[0]) : null
		setValidFiles([...filteredArr])
	}, [selectedFiles])

	const preventDefault = (e) => {
		e.preventDefault()
	}

	// When a file is dragged into a browser from the OS, the browser will attempt to open and display
	// it by default. If you want to allow a drop, you must prevent the default handling of the event handlers.
	const dragOver = (e) => {
		preventDefault(e)
	}

	const dragEnter = (e) => {
		preventDefault(e)
	}

	const dragLeave = (e) => {
		preventDefault(e)
	}

	// on fileDrop, get file data to store in state selectedFiles
	const fileDrop = (e) => {
		preventDefault(e)
		// e.dataTransfer: a Data Transfer object that holds the data that is being dragged during a drag-and-drop operation
		// e.dataTransfer.files: contains the dragged local files as a FileList
		const files = e.dataTransfer.files
		if (files.length) {
			// if file is valid, add to state selectedFiles
			handleFiles(files)
		}
	}

	// handles files uploaded onClick, not drag-drop
	const filesSelected = () => {
		// fileInputRef.current.files points to the files uploaded to input field
		if (fileInputRef.current.files.length) {
			handleFiles(fileInputRef.current.files)
		}
	}

	// simulate click of reffed input field to trigger file upload prompt
	const fileInputClicked = () => {
		fileInputRef.current.click()
	}

	// if file is valid, add to state selectedFiles
	const handleFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (validateFile(files[i])) {
				setSelectedFiles((prevArray) => [...prevArray, files[i]])
			} else {
				// add prop invalid to file to mark it invalid for upload
				files[i]['invalid'] = true
				setSelectedFiles((prevArray) => [...prevArray, files[i]])
			}
		}
	}

	// checks if file type is valid
	const validateFile = (file) => {
		// create a list of acceptable file types
		const validTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
			'image/x-icon'
		]
		// The file parameter from the FileList contains a type property
		// if the type is not found in the array, then filetype is not valid
		if (validTypes.indexOf(file.type) === -1) {
			return false
		}

		return true
	}

	const openImageModal = (file) => {
		//  FileReader object
		//     - enables web applications to asynchronously read the contents of files(or raw data buffers) stored on the user’s computer
		//     - uses File or Blob objects to specify the file or data to read
		const reader = new FileReader()
		modalRef.current.style.display = 'block'
		// read the content of the file using readAsDataURL
		reader.readAsDataURL(file)
		// add an event handler to be triggered once the reading operation is complete
		reader.onload = function (e) {
			// e.target.result attribute contains a data: URL representing the file’s data
			modalImageRef.current.style.backgroundImage = `url(${e.target.result})`
		}
	}

	const closeModal = () => {
		clearLoadedFiles()
		modalRef.current.style.display = 'none'
		modalImageRef.current.style.backgroundImage = 'none'
	}

	// removes all loaded files queued for upload
	const clearLoadedFiles = () => {
		setValidFiles([])
		setSelectedFiles([])
	}

	// choose a new file to upload after loading another file
	const changeUploadFile = () => {
		fileInputClicked()
		clearLoadedFiles()
	}

	const uploadFiles = async () => {
		const formData = new FormData()
		formData.append('image', validFiles[0])
		const response = await setUserAvatar(user.accountId, formData)
		closeModal()
		if (response?.data)
			dispatch(updateUser({ ...user, metaData: response.data }))
	}

	return (
		<AvatarWrapper>
			<AvatarIconContainer
				className="row"
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={fileDrop}
				// when any part of the container is clicked, it triggers the hidden input field by using its ref
				onClick={fileInputClicked}
			>
				<AvatarIcon
					style={{ height: '100%', width: '100%' }}
					userId={user.accountId}
				/>
				<input
					// used to simulate click on input field
					ref={fileInputRef}
					className="file-input"
					type="file"
					multiple
					onChange={filesSelected}
				/>
				<div className="btn-overlay">
					<span className="icon-edit-photo"></span>
				</div>
			</AvatarIconContainer>

			{/* modalRef is used to display and hide the modal element and its contents */}
			<div className="modal" ref={modalRef}>
				<div className="overlay"></div>
				<div className="modal-dialog-container">
					<span className="close" onClick={() => closeModal()}>
						X
					</span>
					{/* modalImageRef displays the image */}
					<div className="modal-image-container">
						<div className="modal-image" ref={modalImageRef}></div>
					</div>
					<div className="btn-array-container">
						<div className="btn" onClick={() => changeUploadFile()}>
							<span className="icon-photo"></span>
							<span className="text">Add Photo</span>
						</div>
						<div className="btn" onClick={() => uploadFiles()}>
							<span className="icon-update"></span>
							<span className="text">Update</span>
						</div>
						<div className="btn">
							<span className="icon-delete"></span>
							<span className="text">Delete</span>
						</div>
					</div>
				</div>
			</div>
		</AvatarWrapper>
	)
}

export default Avatar

const AvatarWrapper = styled.div`
	grid-area: avatar;
	.btn {
		display: flex;
		flex-direction: column;
		margin: auto 0;
	}

	.btn span.text {
		font-size: 20px;
		text-align: center;
	}

	.btn-overlay {
		display: flex;
		position: absolute;
		bottom: 15px;
		right: 15px;
	}

	.btn-overlay span.icon-edit-photo {
		background: url(/media/icons/edit-photo.png) no-repeat;
		width: 60px;
		height: 60px;
		background-size: contain;
		background-color: white;
		border: 3px solid black;
		border-radius: 50%;
		background-size: 35px;
		background-position: center;
	}

	.btn span.icon-photo {
		margin: 0 auto;
		background: url(/media/icons/add-photo.jpeg) no-repeat;
		width: 50px;
		height: 50px;
		background-size: contain;
	}

	.btn span.icon-update {
		margin: 0 auto;
		background: url(/media/icons/upload.png) no-repeat;
		width: 45px;
		height: 45px;
		background-size: contain;
	}

	.btn span.icon-delete {
		margin: 0 auto;
		background: url(/media/icons/delete.jpeg) no-repeat;
		width: 45px;
		height: 45px;
		background-size: contain;
	}

	.btn-array-container {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		border-top: 2px solid #c9c9c9;
		height: 85px;
	}

	.modal-dialog-container {
		position: absolute;
		width: 70%;
		height: 450px;
		left: 15%;
		top: 20%;
		border-style: solid;
		border-color: gray;
		border-radius: 7px;
		background-color: ${(props) => props.theme.color.background.default};
	}

	.modal-image-container {
		position: relative;
		top: 5%;
		margin: auto;
		width: 300px;
		height: 300px;
	}

	.upload-icon {
		width: 50px;
		height: 50px;
		background: url(../../images/upload.png) no-repeat center center;
		background-size: 100%;
		text-align: center;
		margin: 0 auto;
		padding-top: 30px;
	}

	.file-type-logo {
		width: 50px;
		height: 50px;
		background: url(../../images/generic.png) no-repeat center center;
		background-size: 100%;
		position: absolute;
	}

	.container {
		transform: translateY(-100%);
	}

	.container p {
		color: red;
		text-align: center;
	}

	.file-display-container {
		position: fixed;
		width: 805px;
	}

	.file-input {
		display: none;
	}

	.file-type {
		display: inline-block !important;
		position: absolute;
		font-size: 12px;
		font-weight: 700;
		line-height: 13px;
		margin-top: 25px;
		padding: 0 4px;
		border-radius: 2px;
		box-shadow: 1px 1px 2px #abc;
		color: #fff;
		background: #0080c8;
		text-transform: uppercase;
	}

	.file-name {
		display: inline-block;
		vertical-align: top;
		margin-left: 50px;
		color: #4aa1f3;
	}

	.file-error {
		display: inline-block;
		vertical-align: top;
		margin-left: 50px;
		color: #9aa9bb;
	}

	.file-error-message {
		color: red;
	}

	/* .file-type-logo {
    width: 50px;
    height: 50px;
    background: url(../../images/generic.png) no-repeat center center; 
    background-size: 100%;
    position: absolute;
} */

	.file-size {
		display: inline-block;
		vertical-align: top;
		color: #30693d;
		margin-left: 10px;
		margin-right: 5px;
		margin-left: 10px;
		color: #444242;
		font-weight: 700;
		font-size: 14px;
	}

	.file-remove {
		position: absolute;
		top: 20px;
		right: 10px;
		line-height: 15px;
		cursor: pointer;
		color: red;
		margin-right: -10px;
	}

	.modal {
		z-index: 999;
		display: none;
		overflow: hidden;
	}

	.modal .overlay {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.66);
		position: absolute;
		top: 0;
		left: 0;
	}

	.modal .modal-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		object-fit: cover;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.modal-image-text {
		position: absolute;
		color: red;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 16px;
	}

	.close {
		position: absolute;
		top: 15px;
		right: 35px;
		color: #5d5d5d;
		font-size: 40px;
		font-weight: bold;
		transition: 0.3s;
	}

	.upload-modal {
		z-index: 999;
		display: none;
		overflow: hidden;
	}

	.upload-modal .overlay {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.66);
		position: absolute;
		top: 0;
		left: 0;
	}

	.progress-container {
		background: white;
		width: 500px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
	}

	.progress-container span {
		display: flex;
		justify-content: center;
		padding-top: 20px;
		font-size: 20px;
	}

	.progress {
		width: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #efefef;
		height: 20px;
		border-radius: 5px;
	}

	.progress-bar {
		position: absolute;
		background-color: #4aa1f3;
		height: 20px;
		border-radius: 5px;
		text-align: center;
		color: white;
		font-weight: bold;
	}

	.error {
		color: red;
	}
`

const AvatarIconContainer = styled.div`
	height: 220px;
	margin-left: auto;
	position: relative;
	width: 220px;
`
