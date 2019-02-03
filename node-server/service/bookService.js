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
	return await BookType.findById(bookTypeId)
}

bookService.getBooks = async (searchKey) => {
	const books = await Books.findAll({
		include: [
			{
				model: BookType,
				attributes: ['typeName'],
			}
		],
		where: {
			[Op.or]: [
				{
					number: {
						[Op.like]: `%${searchKey}%`
					}
				},
				{
					bname: {
						[Op.like]: `%${searchKey}%`
					}
				},
				{
					author: {
						[Op.like]: `%${searchKey}%`
					}
				},
				{
					publishing: {
						[Op.like]: `%${searchKey}%`
					}
				},
			]
		},
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

bookService.addBook = async (number, bname, author, publishing, timeLimit, book_type) => {
	let bookTypeId = null
	if (book_type) {
		bookTypeId = book_type.key
	}
	try {
		await Books.create({
			number: number,
			bname: bname,
			author: author,
			publishing: publishing,
			timeLimit: timeLimit,
			bookTypeId: bookTypeId
		})
		return {code: 0, msg: '新增成功'}
	} catch (e) {
		return {code: 1, msg: '新增失败'}
	}
}

bookService.getBookInfo = async (bookId) => {
	return await Books.findById(bookId)
}

module.exports = bookService
