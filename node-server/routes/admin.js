const Router = require('koa-router')
const router = new Router()
const adminController = require('../controller/admin')
const permissionCheck = require('../middlewares/permissionCheck')
const requestUser = require('../middlewares/requestUser')

router.prefix('/admin')

// 注册
router.post('/register', adminController.register())
// 登录
router.post('/login', adminController.login())

// 角色相关
router.get('/role', permissionCheck('sys:role:list'), adminController.getRole())
router.post('/role', permissionCheck('sys:role:save'), adminController.addRole())
router.delete('/role', permissionCheck('sys:role:delete'), adminController.delRole())
router.post('/role/info', permissionCheck('sys:role:save'), adminController.saveRoleInfo())
router.get('/role/info', permissionCheck('sys:role:info'), adminController.getRoleInfo())

// 导航菜单
router.get('/nav', adminController.getMenu())

// 用户相关
router.get('/user', permissionCheck('sys:user:list'), adminController.getUserList())
router.post('/user', permissionCheck('sys:user:save'), adminController.addUser())
router.delete('/user', permissionCheck('sys:user:delete'), adminController.delUser())
router.get('/user/info', permissionCheck('sys:user:info'), adminController.getUserInfo())
router.put('/user/info', permissionCheck('sys:user:update'), adminController.putUserInfo())

// 菜单相关(列表)
router.get('/menu', permissionCheck('sys:menu:list'), adminController.getRoute())
router.post('/menu', permissionCheck('sys:menu:save'), adminController.addRoute())
router.delete('/menu', permissionCheck('sys:menu:delete'), adminController.delRoute())
router.get('/menu/info', permissionCheck('sys:menu:info'), adminController.getRouteInfo())
router.put('/menu/info', permissionCheck('sys:menu:update'), adminController.putRouteInfo())

// 个人信息修改
router.put('/my/basic', requestUser(), adminController.putMyBasic())
router.post('/my/upload/head', requestUser(), adminController.uploadHead())
router.put('/my/security', requestUser(), adminController.putMySecurity())

// 路由权鉴
router.post('/route/auth', adminController.getAuth())

// 图书种类
router.get('/book/types', permissionCheck('sys:bookType:list'), adminController.getBookTypes())
router.post('/book/type', permissionCheck('sys:bookType:save'), adminController.addBookType())
router.delete('/book/type', permissionCheck('sys:bookType:delete'), adminController.delBookType())
router.get('/book/type', permissionCheck('sys:bookType:info'), adminController.getBookTypeInfo())
router.put('/book/type', permissionCheck('sys:bookType:update'), adminController.putBookTypeInfo())

// 图书信息
router.get('/books', permissionCheck('sys:book:list'), adminController.getBooks())
router.delete('/book', permissionCheck('sys:book:delete'), adminController.delBook())
router.post('/book', permissionCheck('sys:book:save'), adminController.addBook())
router.get('/book/info', permissionCheck('sys:book:info'), adminController.getBookInfo())
router.put('/book/info', permissionCheck('sys:book:update'), adminController.putBookInfo())

// 借阅用户
router.get('/reader/users', permissionCheck('sys:readerUser:list'), adminController.getReaderUser())


module.exports = router
