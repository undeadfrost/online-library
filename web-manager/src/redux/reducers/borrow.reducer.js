import { UPDATE_BORROWS } from '../actions/borrow.actions'

const initState = {
	borrowList: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_BORROWS:
			return { ...state, borrowList: action.payload.borrowList }
		default:
			return state
	}
}
