import {UPDATE_USER, REST_USER} from '../actions/user.actions'

const initState = {
	accessToken: '',
	isLogin: false,
	userInfo: null,
	userList: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return {...state, ...action.payload}
		case REST_USER:
			return initState
		default:
			return state
	}
}
