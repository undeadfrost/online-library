const BookType = require('../models/BookType')
const Sequelize = require('sequelize')

const Op = Sequelize.Op
let bookService = {}

bookService.getBookTypes = async (searchKey) => {
	let bookTypes = await BookType.findAll({
		where: {
			typeName: {
				[Op.like]: `%${searchKey}%`
			}
		}
	})
	return bookTypes
}

bookService.addBookTypes = async (typeName, detail) => {
	try {
		await BookType.create({
			typeName: typeName,
			detail: detail
		})
		return {code: 0, msg: '新增成功'}
	} catch (e) {
		return {code: 1, msg: '新增失败'}
	}
}

bookService.delBookType = async (bookTypeId) => {
	try {
		await BookType.destroy({where: {id: bookTypeId}})
		return {code: 0, msg: '删除成功'}
	} catch (e) {
		return {code: 1, msg: '删除错误'}
	}
}

module.exports = bookService
