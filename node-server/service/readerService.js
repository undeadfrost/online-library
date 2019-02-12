const UserReader = require('../models/UserReader')
const Sequelize = require('sequelize')

const Op = Sequelize.Op
let readerService = {}

readerService.getReaderUsers = async (searchKey) => {
	return await UserReader.findAll({
		attributes: ['id', 'realName', 'idCard', 'mobile', 'createdAt'],
		where: {
			realName: {
				[Op.like]: `%${searchKey}%`
			}
		}
	})
}

module.exports = readerService
