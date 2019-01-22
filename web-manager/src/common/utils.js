/**
 * 密码校验
 * @param psd 密码
 * @param cpsd 确认密码
 * @param min 最小长度
 * @param max 最大长度
 * @return {boolean}
 */
export const psdVerify = (psd, cpsd, min, max) => {
	if (psd.length <= max && psd.length >= min) {
		if (psd === cpsd) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}


/**
 * 菜单数据格式化
 * @param menus
 * @return {*}
 */
export const formatRoutes = (menus) => {
	let topMenus = menus.filter(item => {
		item.key = item.id
		return item.parent === 0
	})
	topMenus.forEach(menu => {
		let children = menus.filter(item => menu.id === item.parent)
		if (children.length !== 0) menu.children = children
	})
	return topMenus
}
