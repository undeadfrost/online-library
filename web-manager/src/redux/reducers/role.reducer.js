import {UPDATE_ROLES} from '../actions/role.actions'

const initState = null

export default (state = initState, action) => {
	switch (action.type) {
		case UPDATE_ROLES:
			return [
				...action.payload
			]
		default:
			return state
	}
}
