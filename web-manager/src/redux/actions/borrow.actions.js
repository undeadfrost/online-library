import {fetchGetBookBorrows, fetchBorrowHistorys} from '../../api/index'

export const UPDATE_BORROWS = "UPDATE_BORROWS"
export const UPDATE_HISTORYS = "UPDATE_HISTORYS"

export const updateBorrows = (params) => ({
	type: UPDATE_BORROWS,
	payload: params
})

export const updateHistorys = params => ({
	type: UPDATE_HISTORYS,
	payload: params
})

export const fetchBorrows = (params) => {
	return async (dispatch) => {
		return await fetchGetBookBorrows(params).then(response => {
			dispatch(updateBorrows(response))
		})
	}
}

export const fetchHistorys = params => {
	return async dispatch => {
		return await fetchBorrowHistorys(params).then(response => {
			dispatch(updateHistorys(response))
		})
	}
}
