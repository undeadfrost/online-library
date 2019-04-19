const sequelize = require('./mysql')
const fs = require('fs')
const path = require('path')

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
