// lodash.merge: deep merges objects
// 	warning: first object argument gets overwritten
// 	- so dont pass an object you dont want to mutate
import { merge } from 'lodash'

// color palette
const black = 'black'
const darkGray = '#282828'
const gray = '#f3efef'
const pink = '#fc52db'
const purple = '#b123ff'
const lightBlue = '#8870fd'
const lightGray = '#515050'
const offWhite = '#f5f2f2'
const red = '#ff7878'
const white = '#ffffff'

// base theme: shared theme values
const baseTheme = {
	color: {
		background: {
			header: pink,
			footer: `linear-gradient(to bottom right, ${pink}, ${purple})`,
			navbar: {
				hover: pink
			},
			table: {
				head: pink,
				row: white
			},
			button: {
				primary: lightBlue,
				secondary: offWhite,
				danger: red
			}
		},
		scrollbar: pink,
		text: {
			button: {
				primary: white,
				secondary: black,
				danger: white
			},
			navbar: {
				default: pink,
				hover: white
			},
			link: pink
		}
	},
	font: {
		family: 'sans-serif'
	},
	breakpoint: {
		mobile: '375px',
		tablet: '600px',
		laptop: '1200px',
		desktop: '1600px'
	}
}

// lodash merge the custom theme with the base theme
export const themeLight = merge(
	// merge() mutates first object with merged value
	// so make first arg and empty obj and followed by merge objects
	{},
	{
		color: {
			background: {
				default: white,
				body: offWhite,
				card: white,
				form: white,
				input: white,
				navbar: {
					default: gray
				}
			},
			border: darkGray,
			text: {
				default: black
			}
		},
		logo: '/media/logo.png'
	},
	baseTheme
)

export const themeDark = merge(
	// merge() mutates first object with merged value
	// so make first arg and empty obj and followed by merge objects
	{},
	{
		color: {
			background: {
				default: darkGray,
				body: darkGray,
				card: lightGray,
				form: lightGray,
				input: gray,
				navbar: {
					default: lightGray
				}
			},
			border: lightGray,
			text: {
				default: white
			}
		},
		logo: '/media/logo-white.png'
	},
	baseTheme
)
