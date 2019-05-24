const UserReader = require('../models/UserReader');

/**
 * 权限校验中间件，使用与客户端
 * @return {Function}
 */
const userReaderCkeck = () => {
	return async (ctx, next) => {
		const {id} = ctx.state.userReader;
		const userReader = await UserReader.findByPk(id);
		ctx.userReader = userReader;
		if (!userReader) {
			return ctx.body = {code: 1, msg: '无权操作'};
		}
		return next();
	}
}

module.exports = userReaderCkeck;
