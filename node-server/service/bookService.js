const BookType = require('../models/BookType')
const Books = require('../models/Books')
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

bookService.getBookTypeInfo = async (bookTypeId) => {
	const bookTypeInfo = await BookType.findById(bookTypeId)
	return bookTypeInfo
}

bookService.getBooks = async (nameKey) => {
	const books = await Books.findAll({
		include: [{model: BookType, attributes: ['typeName']}],
		where: {
			bname: {
				[Op.like]: `%${nameKey}%`
			}
		}
	})
	return books
}

bookService.delBook = async (bookId) => {
	try {
		Books.destroy({where: {id: bookId}})
		return {code: 0, msg: '删除成功'}
	} catch (e) {
		return {code: 1, msg: '删除失败'}
	}
}

bookService.addBook = async () => {

}

module.exports = bookService
