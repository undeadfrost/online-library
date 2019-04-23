import {UPDATE_BORROWS} from '../actions/borrow.actions'

const initState = {
	borrowSearch: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_BORROWS:
			return {...state, ...action.payload}
		default:
			return state
	}
}
