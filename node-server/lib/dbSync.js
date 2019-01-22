const sequelize = require('./mysql')
const fs = require('fs')
const path = require('path')
// const SysMenu = require('../models/SysMenu')
// const SysRole = require('../models/SysRole')
// const SysUser = require('../models/SysUser')
// const UserReader = require('../models/UserReader')
// const BookBorrow = require('../models/BookBorrow')
// const Books = require('../models/Books')
// const BookType = require('../models/BookType')

/**
 * 自动导入
 * @param {*} app 
 * @param {*} path 
 */
const autoImport = (path) => {
	let files = fs.readdirSync(path)
	let js_files = files.filter(file => {
		return file.endsWith('.js')
	})
	js_files.forEach(file => {
		let models = require(path + file)
		console.log(`import model ${file}...`)
	})
}
autoImport(path.resolve(__dirname, '..') + '/models/')
// 同步所有尚未在数据库中的模型
sequelize.sync()

// 强制同步所有模型
// sequelize.sync({force: true})
