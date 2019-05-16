const sequelize = require('../lib/mysql');
const Sequelize = sequelize.Sequelize;
const Books = require('./Books');
const UserReader = require('./UserReader');

const BookBorrowRecord = sequelize.define('book_borrow_record', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	bookId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Books,
			key: 'id'
		}
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: UserReader,
			key: 'id'
		}
	},
	borrow_time: {
		allowNull: false,
		type: Sequelize.DATE,
	},
	return_time: {
		allowNull: false,
		type: Sequelize.DATE,
	}
}, {timestamps: false})

BookBorrowRecord.belongsTo(Books)
BookBorrowRecord.belongsTo(UserReader,{foreignKey: 'userId'})

module.exports = BookBorrowRecord
