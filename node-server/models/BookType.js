const sequelize = require('../lib/mysql');
const Sequelize = sequelize.Sequelize;

const BookTypes = sequelize.define('book_type', {
  id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
  },
  typeName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  detail: {
    type: Sequelize.TEXT,
  }
}, {freezeTableName: true, timestamps: false});

module.exports = BookTypes;