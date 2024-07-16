const isEmpty = (value) => {
	if ([undefined, null, ''].includes(value)) {
		return true
	} else if (typeof value === 'string') {
		return value.trim().length === 0
	} else if (Array.isArray(value)) {
		return value.length === 0
	} else if (typeof value === 'object') {
		return Object.keys(value).length === 0
	} else {
		return false
	}
}
export default isEmpty
