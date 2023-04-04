import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GlobalStyles } from './shared/GlobalStyles'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { themeLight, themeDark } from './shared/theme.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './ui/Header'
import Footer from './ui/Footer'
import { Auth, AuthAdmin } from './components/Auth'
import {
	AdminProfile,
	MentorProfile,
	MentorSearch,
	Login,
	Registration,
	UserProfileSummary,
	MenteeProfile
} from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from './redux/slices/authSlice'
import {
	getUser,
	selectUser,
	selectDarkModeEnabled
} from './redux/slices/userSlice'
import Sidebar from './ui/Sidebar'
import { selectSidebar } from './redux/slices/sidebarSlice'
import { FlexRow } from './ui/Flex'

const App = () => {
	const auth = useSelector(selectAuthUser)
	const user = useSelector(selectUser)
	const darkModeEnabled = useSelector(selectDarkModeEnabled)
	const { sidebar: showSidebar } = useSelector(selectSidebar)
	const dispatch = useDispatch()

	useEffect(() => {
		// gets user profile data (using this prevents errors on page refresh)
		if (user.isFetching) dispatch(getUser())
	}, [dispatch])

	function showHeader() {
		const pathname = window.location.pathname
		return (
			auth &&
			auth.isLoggedIn &&
			pathname !== '/login' &&
			pathname !== '/registrationPage'
		)
	}

	return (
		<ThemeProvider theme={darkModeEnabled ? themeDark : themeLight}>
			<BrowserRouter>
				<GlobalStyles />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<AppLayout className="App">
					<MainContainer>
						{showSidebar && <Sidebar />}
						<div style={{ width: '100%' }}>
							{showHeader() && <Header />}
							<PageContainer>
								<Routes>
									{auth && auth.isLoggedIn ? (
										<Route path="/" element={<MentorSearch />} />
									) : (
										<Route path="/" element={<Login />} />
									)}
									<Route path="login" element={<Login />} />
									<Route path="registrationPage" element={<Registration />} />
									<Route
										path="mentorSearch"
										element={
											<Auth>
												<MentorSearch />
											</Auth>
										}
									/>
									<Route
										path="profileSummary"
										element={
											<Auth>
												<UserProfileSummary />
											</Auth>
										}
									/>
									<Route
										path="profileMentee"
										element={
											<Auth>
												<MenteeProfile />
											</Auth>
										}
									/>
									<Route
										path="profileMentor"
										element={
											<Auth>
												<MentorProfile />
											</Auth>
										}
									/>
									<Route
										path="adminProfile"
										element={
											<AuthAdmin>
												<AdminProfile />
											</AuthAdmin>
										}
									/>
									{/* handles case where navigated url does not exist */}
									<Route path="*" element={<Navigate to="/" />} />
								</Routes>
							</PageContainer>
						</div>
					</MainContainer>
					<Footer />
				</AppLayout>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App

const AppLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
	padding: 0px;
	width: 100%;
`

const MainContainer = styled(FlexRow)`
	height: 100%;
	width: 100%;
	// now when list results get to big for container
	// the overflow turns to a scroll and footer isn't affected
	overflow: overlay;
`

const PageContainer = styled.div`
	height: 100%;
	padding: 10px;
`
