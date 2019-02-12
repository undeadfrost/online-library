export const UPDATE_USER = 'UPDATE_USER'
export const REST_USER = 'REST_USER'
export const SET_READER_USER_LIST = 'SET_READER_USER_LIST'

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

export const setReaderUserList = (params) => {
	return {
		type: SET_READER_USER_LIST,
		payload: params
	}
}
