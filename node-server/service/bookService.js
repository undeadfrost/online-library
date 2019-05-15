const BookType = require('../models/BookType')
const Books = require('../models/Books')
const BookBorrow = require('../models/BookBorrow')
const UserReader = require('../models/UserReader')
const BorrowRecord = require('../models/BookBorrowRecord')
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
	return await BookType.findByPk(bookTypeId)
}

bookService.putBookTypeInfo = async (bookTypeId, typeName, detail) => {
	try {
		const bookType = await BookType.findByPk(bookTypeId)
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
				{
					'$book_type.typeName$': {
						[Op.like]: `%${searchKey}%`
					}
				}
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
	const book = await Books.findByPk(bookId)
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


bookService.getBookBorrows = async (number, bname = "", realName = "", keyword = "") => {
	let where = {}
	if (number) {
		where['$book.number$'] = number
	}
	return await BookBorrow.findAll({
		include: [{
			model: Books,
			attributes: ['id', 'number', 'bname', 'author', 'publishing']
		}, {
			model: UserReader,
			attributes: ['id', 'realName', 'idCard', 'mobile']
		}],
		where: {
			...where,
			'$book.bname$': {
				[Op.like]: `%${bname}%`
			},
			'$user_reader.realName$': {
				[Op.like]: `%${realName}%`
			},
			[Op.or]: [
				{
					'$book.author$': {
						[Op.like]: `%${keyword}%`
					},
				},
				{
					'$book.publishing$': {
						[Op.like]: `%${keyword}%`
					},
				},
				{
					'$user_reader.idCard$': {
						[Op.like]: `%${keyword}%`
					},
				},
				{
					'$user_reader.mobile$': {
						[Op.like]: `%${keyword}%`
					}
				}
			]
		}
	})
}

bookService.addBookBorrow = async (number, idCard) => {
	const bookPromise = Books.findOne({where: {number: number}})
	const userPromise = UserReader.findOne({where: {idCard: idCard}})
	const borrowPromise = BookBorrow.findOne({
		include: [{
			model: Books,
			attributes: ['number']
		}],
		where: {
			'$book.number$': number
		}
	})
	const [book, user, borrow] = await Promise.all([bookPromise, userPromise, borrowPromise])
	if (borrow) {
		return {code: 1, msg: '图书已被借阅！'}
	} else {
		if (!book) {
			return {code: 1, msg: '编号有误！'}
		}
		if (!user) {
			return {code: 1, msg: '身份证号有误！'}
		}
	}
	try {
		await BookBorrow.create({
			bookId: book.id,
			userId: user.id,
			status: 0,
			borrow_time: new Date(),
			return_time: null
		})
		return {code: 0, msg: '借阅成功'}
	} catch (e) {
		return {code: 1, msg: '服务器错误！'}
	}
}

bookService.delBookBorrow = async (borrowId) => {
	try {
		await BookBorrow.destroy({where: {id: borrowId}})
		return {code: 0, msg: '删除成功！'}
	} catch (e) {
		return {code: 1, msg: '删除失败！'}
	}
}

bookService.getBookBorrowInfo = async (borrowId) => {
	const borrowInfo = await BookBorrow.findOne({
		include: [{
			model: Books,
			attributes: ['id', 'number', 'bname', 'author', 'publishing']
		}, {
			model: UserReader,
			attributes: ['id', 'realName', 'idCard', 'mobile']
		}],
		where: {
			id: borrowId
		}
	})
	if (borrowInfo) {
		return {code: 0, borrowInfo}
	} else {
		return {code: 1, msg: '参数无效!'}
	}
}


bookService.putBookBorrowInfo = async (borrowId) => {
	const borrow = await BookBorrow.findByPk(borrowId)
	if (borrow) {
		try {
			await BorrowRecord.create({
				bookId: borrow.bookId,
				userId: borrow.userId,
				borrow_time: borrow.borrow_time,
				return_time: new Date()
			})
			await borrow.destroy({force: true})
			return {code: 0, msg: '还书成功！'}
		} catch (e) {
			return {code: 1, msg: '系统出错！'}
		}
	} else {
		return {code: 1, msg: '图书借阅记录不存在！'}
	}
}
module.exports = bookService
