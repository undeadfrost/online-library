const commonService = require('../service/commonService')
const userService = require('../service/userService')
const routeService = require('../service/routeService')
const roleService = require('../service/roleService')
const bookService = require('../service/bookService')
const readerService = require('../service/readerService')

let adminController = {}

adminController.register = () => {
	return async (ctx) => {
		const {username, password} = ctx.request.body
		ctx.body = await userService.register(username, password)
	}
}

adminController.login = () => {
	return async (ctx) => {
		const {username, password} = ctx.request.body
		ctx.body = await userService.login(username, password)
	}
}

adminController.getMenu = () => {
	return async (ctx) => {
		const {id} = ctx.state.user
		const user = await commonService.getUser(id)
		ctx.body = await routeService.getMenu(user)
	}
}

adminController.getUserInfo = () => {
	return async (ctx) => {
		const {userId} = ctx.query
		ctx.body = await userService.getUserInfo(userId)
	}
}

adminController.getUserList = () => {
	return async (ctx) => {
		let {searchKey} = ctx.query
		if (!searchKey) searchKey = ''
		ctx.body = await userService.getUserList(ctx.user, searchKey)
	}
}

adminController.addUser = () => {
	return async (ctx) => {
		const {username, password, confirm, mobile, status, roleIds} = ctx.request.body
		if (password === confirm && roleIds.length > 0) {
			ctx.body = await userService.addUser(ctx.user, username, password, mobile, status, roleIds)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.delUser = () => {
	return async (ctx) => {
		const {userId} = ctx.query
		if (userId && parseInt(userId) !== ctx.user.id) {
			ctx.body = await userService.delUser(userId)
		} else {
			ctx.body = {code: 1, msg: '删除有误'}
		}
	}
}

adminController.putUserInfo = () => {
	return async (ctx) => {
		const {userId, username, password, confirm, mobile, status, roleIds} = ctx.request.body
		if (userId && username && status && roleIds.length > 0 && password === confirm) {
			ctx.body = await userService.putUserInfo(userId, username, password, mobile, status, roleIds)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.getAuth = () => {
	return async (ctx, next) => {
		const {route} = ctx.request.body
		const {id} = ctx.state.user
		const user = await commonService.getUser(id)
		ctx.body = await routeService.getAuth(user, route)
	}
}

adminController.getRole = () => {
	return async (ctx) => {
		let {roleName} = ctx.query
		if (!roleName) roleName = ''
		ctx.body = await roleService.getRole(ctx.user, roleName)
	}
}

adminController.addRole = () => {
	return async (ctx) => {
		const {roleName, remark} = ctx.request.body
		if (roleName) {
			ctx.body = await roleService.addRole(ctx.user, roleName, remark)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.delRole = () => {
	return async (ctx) => {
		const {roleIds} = ctx.query
		const roles = await ctx.user.getSys_roles()
		for (let role of roles) {
			if (role.id === parseInt(roleIds)) {
				return ctx.body = {code: 1, msg: '无法删除与自己关联的角色'}
			}
		}
		ctx.body = await roleService.delRole(roleIds)
	}
}

adminController.putRole = () => {

}

adminController.saveRoleInfo = () => {
	return async (ctx) => {
		let {roleId, menuIds} = ctx.request.body
		if (!menuIds) menuIds = []
		ctx.body = await roleService.saveRoleInfo(ctx.user, roleId, menuIds)
	}
}

adminController.getRoleInfo = () => {
	return async (ctx) => {
		const {roleId} = ctx.query
		ctx.body = await roleService.getRoleInfo(ctx.user, roleId)
	}
}

adminController.getRoute = () => {
	return async (ctx) => {
		ctx.body = await routeService.getRoute()
	}
}

adminController.addRoute = () => {
	return async (ctx) => {
		const {parent, routeName, menuRoute, menuPermission, icon, orderNum, type} = ctx.request.body
		if (type && type === "0") {
			if (routeName && orderNum) {
				ctx.body = await routeService.addRoute(0, routeName, menuRoute, menuPermission, icon, orderNum, type)
			} else {
				ctx.body = {code: 1, msg: '参数有误！'}
			}
		} else if (type && type === "1") {
			if (parent && routeName && menuRoute && orderNum) {
				ctx.body = await routeService.addRoute(parent, routeName, menuRoute, menuPermission, icon, orderNum, type)
			} else {
				ctx.body = {code: 1, msg: '参数有误！'}
			}
		} else {
			ctx.body = {code: 1, msg: '参数有误！'}
		}
	}
}

adminController.delRoute = () => {
	return async (ctx) => {
		const {menuId} = ctx.query
		ctx.body = await routeService.delRoute(menuId)
	}
}

adminController.getRouteInfo = () => {
	return async (ctx) => {
		const {menuId} = ctx.query
		ctx.body = await routeService.getRouteInfo(menuId)
	}
}

adminController.putRouteInfo = () => {
	return async (ctx) => {
		let {menuId, menuRoute, menuPermission, routeName, icon, orderNum, parentMenu, type} = ctx.request.body
		type = parseInt(type)
		if (type === 0 && menuId && routeName && icon && orderNum) {
			ctx.body = await routeService.putRouteInfo(menuId, menuRoute, menuPermission, routeName, icon, orderNum, parentMenu, type)
		} else if (type === 1 && menuId && routeName && menuRoute && parentMenu && orderNum) {
			ctx.body = await routeService.putRouteInfo(menuId, menuRoute, menuPermission, routeName, icon, orderNum, parentMenu, type)
		} else {
			ctx.body = {code: 1, msg: '参数有误！'}
		}
	}
}

adminController.putMyBasic = () => {
	return async (ctx) => {
		let {mobile} = ctx.request.body
		ctx.body = await userService.putMyBasic(ctx.user, {mobile: mobile})
	}
}

adminController.putMySecurity = () => {
	return async (ctx) => {
		let {password, confirm} = ctx.request.body
		if (password === confirm && password.length >= 6) {
			ctx.body = await userService.putMySecurity(ctx.user, password)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.uploadHead = () => {
	return async (ctx) => {
		// 上传单个文件
		const file = ctx.request.files.file
		ctx.body = await userService.uploadHead(ctx.user, file)
	}
}

adminController.getBookTypes = () => {
	return async ctx => {
		let {searchKey} = ctx.query
		if (!searchKey) searchKey = ''
		ctx.body = await bookService.getBookTypes(searchKey)
	}
}

adminController.addBookType = () => {
	return async ctx => {
		const {typeName, detail} = ctx.request.body
		if (typeName) {
			ctx.body = await bookService.addBookTypes(typeName, detail)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.delBookType = () => {
	return async ctx => {
		const {bookTypeId} = ctx.query
		ctx.body = await bookService.delBookType(bookTypeId)
	}
}

adminController.getBookTypeInfo = () => {
	return async ctx => {
		const {bookTypeId} = ctx.query
		ctx.body = await bookService.getBookTypeInfo(bookTypeId)
	}
}

adminController.putBookTypeInfo = () => {
	return async ctx => {
		const {bookTypeId, typeName, detail} = ctx.request.body
		ctx.body = await bookService.putBookTypeInfo(bookTypeId, typeName, detail)
	}
}

adminController.getBooks = () => {
	return async ctx => {
		let {searchKey} = ctx.query
		if (!searchKey) searchKey = ''
		ctx.body = await bookService.getBooks(searchKey)
	}
}

adminController.delBook = () => {
	return async ctx => {
		let {bookId} = ctx.query
		ctx.body = await bookService.delBook(bookId)
	}
}

adminController.addBook = () => {
	return async ctx => {
		const {number, bname, author, publishing, timeLimit, bookTypeId} = ctx.request.body
		const {cover} = ctx.request.files
		if (number && bname && author && publishing && timeLimit) {
			ctx.body = await bookService.addBook(number, bname, author, publishing, timeLimit, bookTypeId, cover)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.getBookInfo = () => {
	return async ctx => {
		const {bookId} = ctx.query
		ctx.body = await bookService.getBookInfo(bookId)
	}
}

adminController.putBookInfo = () => {
	return async ctx => {
		const {bookId, number, bname, author, publishing, timeLimit, bookTypeId} = ctx.request.body
		const {cover} = ctx.request.files
		if (bookId && number && bname && author && publishing && timeLimit) {
			ctx.body = await bookService.putBookInfo(bookId, number, bname, author, publishing, timeLimit, bookTypeId, cover)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.getReaderUsers = () => {
	return async ctx => {
		let {searchKey} = ctx.query
		if (!searchKey) searchKey = ''
		ctx.body = await readerService.getReaderUsers(searchKey)
	}
}

adminController.addReaderUser = () => {
	return async ctx => {
		const {realName, idCard, password, confirm, mobile} = ctx.request.body
		if (realName && idCard && password && confirm && mobile && password === confirm) {
			ctx.body = await readerService.addReaderUser(realName, idCard, password, mobile)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.delReaderUser = () => {
	return async ctx => {
		const {userId} = ctx.query
		ctx.body = await readerService.delReaderUser(userId)
	}
}

adminController.getReaderUserInfo = () => {
	return async ctx => {
		const {userId} = ctx.query
		ctx.body = await readerService.getReaderUserInfo(userId)
	}
}

adminController.putReaderUserInfo = () => {
	return async ctx => {
		const {userId, realName, idCard, password, confirm, mobile} = ctx.request.body
		if (userId && realName && idCard && mobile && password === confirm) {
			ctx.body = await readerService.putReaderUser(userId, realName, idCard, password, mobile)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.getBookBorrows = () => {
	return async ctx => {
		const {number, bname, realName, keyword} = ctx.query
		ctx.body = await bookService.getBookBorrows(number, bname, realName, keyword)
	}
}

adminController.addBookBorrow = () => {
	return async ctx => {
		const {number, idCard} = ctx.request.body
		if (number && idCard) {
			ctx.body = await bookService.addBookBorrow(number, idCard)
		} else {
			ctx.body = {code: 1, msg: '参数有误'}
		}
	}
}

adminController.delBookBorrow = () => {
	return async ctx => {
		const {borrowId} = ctx.query
		ctx.body = await bookService.delBookBorrow(borrowId)
	}
}

adminController.getBookBorrowInfo = () => {
	return async ctx => {
		const {borrowId} = ctx.query
		ctx.body = await bookService.getBookBorrowInfo(borrowId)
	}
}

adminController.putBookBorrowInfo = () => {
	return async ctx => {
		const {borrowId} = ctx.request.body
		ctx.body = await bookService.putBookBorrowInfo(borrowId)
	}
}

adminController.getBorrowHistorys = () => {
	return async ctx => {
		const {number, bname, realName, keyword} = ctx.query
		ctx.body = await bookService.getBorrowHistorys(number, bname, realName, keyword)
	}
}

module.exports = adminController
