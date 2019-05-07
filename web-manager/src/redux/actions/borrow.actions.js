import {fetchGetBookBorrows} from '../../api/index'

export const UPDATE_BORROWS = "UPDATE_BORROWS"

export const updateBorrows = (params) => ({
	type: UPDATE_BORROWS,
	payload: params
})

export const fetchBorrows = (params) => {
	return async (dispatch) => {
		return await fetchGetBookBorrows(params).then(response => {
			dispatch(updateBorrows(response))
		})
	}
}
