const UserReader = require('../models/UserReader')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

const Op = Sequelize.Op
let readerService = {}

readerService.getReaderUsers = async (searchKey) => {
	return await UserReader.findAll({
		attributes: ['id', 'realName', 'idCard', 'mobile', 'createdAt'],
		where: {
			[Op.or]: [
				{
					realName: {
						[Op.like]: `%${searchKey}%`
					}
				},
				{
					idCard: {
						[Op.like]: `%${searchKey}%`
					}
				},
				{
					mobile: {
						[Op.like]: `%${searchKey}%`
					}
				}
			]
		}
	})
}

readerService.addReaderUser = async (realName, idCard, password, mobile) => {
	const existUser = await UserReader.findOne({where: {mobile: mobile}})
	if (existUser) {
		return {code: 1, msg: '手机号已注册'}
	} else {
		// 密码加密
		const salt = bcrypt.genSaltSync(10)
		const hashPassword = bcrypt.hashSync(password, salt)
		try {
			await UserReader.create({
				realName: realName,
				idCard: idCard,
				password: hashPassword,
				mobile: mobile
			})
			return {code: 0, msg: '新增成功'}
		} catch (e) {
			return {code: 1, msg: '新增失败'}
		}
	}
}

readerService.delReaderUser = async (userId) => {
	try {
		await UserReader.destroy({where: {id: userId}})
		return {code: 0, msg: '删除成功'}
	} catch (e) {
		return {code: 1, msg: '删除失败'}
	}
}

module.exports = readerService
