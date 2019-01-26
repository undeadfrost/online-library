import {UPDATE_BOOK_TYPES, UPDATE_BOOKLIST} from '../actions/book.actions'

const initState = {
	bookTypes: [],
	bookList: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_BOOK_TYPES:
			return {...state, bookTypes: action.payload.bookTypes}
		case UPDATE_BOOKLIST:
			return {...state, bookList: action.payload.bookList}
		default:
			return state
	}
}
