import {combineReducers} from 'redux'
import userReducer from './user.reducer'
import menuReducer from './menu.reducer'
import rolesReducer from './role.reducer'
import bookReducer from './book.reducer'

export default combineReducers({
	userData: userReducer,
	menusData: menuReducer,
	rolesData: rolesReducer,
	booksData: bookReducer,
})
