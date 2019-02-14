const sequelize = require('../lib/mysql');
const Sequelize = sequelize.Sequelize;

const UserReader = sequelize.define('user_reader', {
  id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
  },
  realName: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  idCard: {
    type: Sequelize.STRING(18),
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING(13),
    allowNull: false,
  },
	password: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
},{freezeTableName: true})

module.exports = UserReader;
