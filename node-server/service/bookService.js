const BookType = require('../models/BookType')
const Books = require('../models/Books')
const BookBorrow = require('../models/BookBorrow')
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

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

bookService.putBookTypeInfo = async (bookTypeId, typeName, detail) => {
	try {
		const bookType = await BookType.findById(bookTypeId)
		await bookType.update({
			typeName: typeName,
			detail: detail
		})
		return {code: 0, msg: '更新成功'}
	} catch (e) {
		return {code: 1, msg: '更新失败'}
	}
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

bookService.addBook = async (number, bname, author, publishing, timeLimit, bookTypeId, cover) => {
	try {
		// 创建可读流
		const readStream = fs.createReadStream(cover.path);
		const fileFormat = cover.name.split('.')
		const fileName = bname + Date.now() + '.' + fileFormat[fileFormat.length - 1]
		let filePath = path.join(__dirname, `../public/uploads/bookCovers/${fileName}`);
		// 创建可写流
		const writeStream = fs.createWriteStream(filePath);
		// 可读流通过管道写入可写流
		readStream.pipe(writeStream);
		await Books.create({
			number: number,
			bname: bname,
			author: author,
			publishing: publishing,
			timeLimit: timeLimit,
			bookTypeId: bookTypeId,
			cover: `/uploads/bookCovers/${fileName}`
		})
		return {code: 0, msg: '新增成功'}
	} catch (e) {
		return {code: 1, msg: '新增失败'}
	}
}

bookService.getBookInfo = async (bookId) => {
	return await Books.findOne({
		include: [
			{
				model: BookType,
			}
		],
		where: {id: bookId}
	})
}

bookService.putBookInfo = async (bookId, number, bname, author, publishing, timeLimit, bookTypeId, cover) => {
	const book = await Books.findById(bookId)
	let fields = ['number', 'bname', 'author', 'publishing', 'timeLimit', 'bookTypeId']
	try {
		let fileName = ''
		if (cover.path) {
			// 创建可读流
			const readStream = fs.createReadStream(cover.path);
			const fileFormat = cover.name.split('.')
			fileName = bname + Date.now() + '.' + fileFormat[fileFormat.length - 1]
			let filePath = path.join(__dirname, `../public/uploads/bookCovers/${fileName}`);
			// 创建可写流
			const writeStream = fs.createWriteStream(filePath);
			// 可读流通过管道写入可写流
			readStream.pipe(writeStream);
			fields = fields.concat(['cover'])
		}
		await book.update({
			number: number,
			bname: bname,
			author: author,
			publishing: publishing,
			timeLimit: timeLimit,
			bookTypeId: bookTypeId,
			cover: `/uploads/bookCovers/${fileName}`
		}, {fields: fields})
		return {code: 0, msg: '更新成功'}
	} catch (e) {
		return {code: 1, msg: '更新失败'}
	}
}


bookService.getBookBorrows = async (number, bname, keyword) => {
	return await BookBorrow.findAll({
		include: [{
			model: Books,
			// where: {
			// 	number: number
			// }
		}],
	})
}
module.exports = bookService
