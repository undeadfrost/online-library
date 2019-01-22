export const UPDATE_USER = 'UPDATE_USER'
export const REST_USER = 'REST_USER'

export const updateUser = (params) => {
	return {
		type: UPDATE_USER,
		payload: params
	}
}

export const restUser = (params) => {
	return {
		type: REST_USER,
		payload: params
	}
}
