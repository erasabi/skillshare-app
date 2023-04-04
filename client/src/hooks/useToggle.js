import { useState } from 'react'

const useToggle = (defaultValue) => {
	const [value, setValue] = useState(defaultValue)

	function toggleValue(value) {
		setValue((currentValue) =>
			typeof value === 'boolean' ? value : !currentValue
		)
	}

	return { value, toggleValue, setValue }
}

export default useToggle