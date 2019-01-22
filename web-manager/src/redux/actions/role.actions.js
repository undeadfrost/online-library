export const UPDATE_ROLES = 'UPDATE_ROLES'

export const updateRoles = (params) => {
	return {
		type: UPDATE_ROLES,
		payload: params
	}
}
