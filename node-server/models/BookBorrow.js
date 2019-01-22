const sequelize = require('../lib/mysql');
const Sequelize = sequelize.Sequelize;
const Books = require('./Books');
const UserReader = require('./UserReader');

const BookBorrow = sequelize.define('book_borrow', {
  id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
  },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Books,
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: UserReader,
      key: 'id'
    }
  }
},{freezeTableName: true, timestamps: false})

module.exports = BookBorrow;