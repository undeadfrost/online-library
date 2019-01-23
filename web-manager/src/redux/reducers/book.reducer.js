import {UPDATE_BOOK_TYPES} from '../actions/book.actions'

const initState = {
	bookTypes: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_BOOK_TYPES:
			return {...state, ...action.payload}
		default:
			return state
	}
}
