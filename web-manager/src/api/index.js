import http from './http'

export const fetchLogin = (params) => {
	return http('post', '/admin/login', params)
}

export const fetchRouteAuth = (params) => {
	return http('post', '/admin/route/auth', params)
}

export const fetchGetRoute = () => {
	return http('get', '/admin/nav')
}

export const fetchGetRole = (params) => {
	return http('get', '/admin/role', params)
}

export const fetchAddRole = (params) => {
	return http('post', '/admin/role', params)
}

export const fetchDelRole = (params) => {
	return http('delete', '/admin/role/', params)
}

export const fetchSaveRoleInfo = (params) => {
	return http('post', '/admin/role/info', params)
}

export const fetchGetRoleInfo = (params) => {
	return http('get', '/admin/role/info', params)
}

export const fetchGetUserList = (params) => {
	return http('get', '/admin/user', params)
}

export const fetchGetUserInfo = (params) => {
	return http('get', '/admin/user/info', params)
}

export const fetchAddUser = (params) => {
	return http('post', '/admin/user', params)
}

export const fetchDelUser = (params) => {
	return http('delete', '/admin/user', params)
}

export const fetchPutUserInfo = (params) => {
	return http('put', '/admin/user/info', params)
}

export const fetchGetMenu = () => {
	return http('get', '/admin/menu')
}

export const fetchAddMenu = (params) => {
	return http('post', '/admin/menu', params)
}

export const fetchDelMenu = (params) => {
	return http('delete', '/admin/menu', params)
}

export const fetchGetMenuInfo = (params) => {
	return http('get', '/admin/menu/info', params)
}

export const fetchPutMenuInfo = (params) => {
	return http('put', '/admin/menu/info', params)
}

export const fetchPutMyBasic = (params) => {
	return http('put', '/admin/my/basic', params)
}

export const fetchPutMySecurity = (params) => {
	return http('put', '/admin/my/security', params)
}
