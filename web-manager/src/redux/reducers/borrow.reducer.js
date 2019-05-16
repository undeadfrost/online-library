import * as TYPE from '../actions/borrow.actions'

const initState = {
	borrowList: [],
	historyList: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case TYPE.UPDATE_BORROWS:
			return {...state, borrowList: action.payload}
		case TYPE.UPDATE_HISTORYS:
			return {...state, historyList: action.payload}
		default:
			return state
	}
}
