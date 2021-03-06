const crypto = require('crypto')
const fs = require('fs')

/**
 * 生成当前时间时间戳
 * @return {number}
 */
exports.getTimstamp = () => {
	return Date.parse(new Date()) / 1000
}

/**
 * jwt secret生成
 * @param username
 * @param timstamp
 * @return {string}
 */
exports.generateSecret = (username, timstamp) => {
	// 获取随机数
	const nonce = Math.floor(Math.random() * 99999)
	// 字典排序
	const arr = [username, timstamp, nonce].sort()
	// 加密
	const sha1 = crypto.createHash('sha1').update(arr.join(''))
	return sha1.digest('hex')
}

/**
 * 判断一个不重复的数组是否包含另一个
 * @param arr1
 * @param arr2
 * @return {boolean}
 * @constructor
 */
exports.isContained = (arr1, arr2) => {
	if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
	if (arr1.length < arr2.length) return false
	arr2.forEach(item => {
		if (!arr1.includes(item)) return false
	})
	return true
}

/**
 * 对象数组去重
 * @param objArray
 * @return {*}
 */
exports.objArrayDoWeight = (objArray) => {
	let obj = {}
	objArray = objArray.reduce((item, next) => {
		obj[next.id] ? '' : obj[next.id] = true && item.push(next)
		return item
	}, [])
	return objArray
}

/**
 * 菜单排序
 * @param menus
 */
exports.menusOrder = (menus) => {
	menus.sort((obj1, obj2) => {
		orderNum1 = obj1.orderNum
		orderNum2 = obj2.orderNum
		if (orderNum1 < orderNum2) {
			return -1
		} else if (orderNum1 > orderNum2) {
			return 1
		} else {
			return 0
		}
	})
	return menus
}

/**
 *
 * @param folderpath
 */
exports.checkDirExist = (folderpath) => {
	const pathArr = folderpath.split('/');
	let _path = '';
	for (let i = 0; i < pathArr.length; i++) {
		if (pathArr[i]) {
			_path += `/${pathArr[i]}`;
			if (!fs.existsSync(_path)) {
				fs.mkdirSync(_path);
			}
		}
	}
}

