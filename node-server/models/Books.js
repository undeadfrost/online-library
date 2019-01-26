const sequelize = require('../lib/mysql');
const Sequelize = sequelize.Sequelize;
const BookType = require('./BookType')

const Books = sequelize.define('books', {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	number: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	bname: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	publishing: {
		type: Sequelize.STRING(50),
	},
	timeLimit: {
		type: Sequelize.INTEGER(10),
		allowNull: false
	}
	
}, {freezeTableName: true, timestamps: false})

module.exports = Books;

BookType.hasMany(Books);
Books.belongsTo(BookType)
