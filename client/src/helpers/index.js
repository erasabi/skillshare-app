export const cacheBuster = () => {
	return `?${new Date().getTime()}`
}
