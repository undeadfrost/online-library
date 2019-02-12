import {UPDATE_USER, REST_USER, SET_READER_USER_LIST} from '../actions/user.actions'

const initState = {
	accessToken: '',
	isLogin: false,
	userInfo: null,
	userList: [],
	readerUserList: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return {...state, ...action.payload}
		case REST_USER:
			return initState
		case SET_READER_USER_LIST:
			return {...state, readerUserList: action.payload}
		default:
			return state
	}
}
