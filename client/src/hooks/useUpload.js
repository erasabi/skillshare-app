import { useState } from 'react'

const useUpload = (defaultValue) => {
	const [value, setValue] = useState(defaultValue)
	const onChange = (value) => setValue(value)

	return { value, setValue, onChange }
}

export default useUpload
