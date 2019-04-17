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


/**
 * object深拷贝
 * @param initalObj
 * @param finalObj
 */
export const deepClone = (initalObj, finalObj) => {
	let obj = finalObj || {};
	for (let i in initalObj) {
		let prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
		if (prop === obj) {
			continue;
		}
		if (typeof prop === 'object') {
			obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
		} else {
			obj[i] = prop;
		}
	}
	return obj;
}

/**
 * object转formData(文件随表单上传)
 * @param obj
 * @param form
 * @param namespace
 * @return {*|FormData}
 */
export function objectToFormData(obj, form, namespace) {
	const fd = form || new FormData();
	let formKey;
	
	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			let key = Array.isArray(obj) ? '' : `.${property}`;
			if (namespace) {
				formKey = namespace + key;
			} else {
				formKey = property;
			}
			
			// if the property is an object, but not a File, use recursivity.
			if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
				objectToFormData(obj[property], fd, formKey);
			} else if (obj[property] === '') {
				// 空文件不做处理
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
			}
			
		}
	}
	return fd;
}
