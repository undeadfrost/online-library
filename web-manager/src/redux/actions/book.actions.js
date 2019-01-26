export const UPDATE_BOOK_TYPES = 'UPDATE_BOOK_TYPES'
export const UPDATE_BOOKLIST = 'UPDATE_BOOKLIST'

export const updateBookTypes = (params) => ({
	type: UPDATE_BOOK_TYPES,
	payload: params
})

export const updateBookList = (params) => ({
	type: UPDATE_BOOKLIST,
	payload: params
})
