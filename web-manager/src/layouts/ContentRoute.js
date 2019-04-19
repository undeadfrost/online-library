import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import PermissionRoute from "../components/Auth/PermissionRoute"
import Welcome from '../pages/Welcome/index'
import UserList from '../pages/User/UserList'
import Role from '../pages/Role/index'
import Menu from '../pages/Menu/index'
import Personal from '../pages/User/Personal/index'
import BookTypes from '../pages/Book/Types/index'
import BookInformation from '../pages/Book/Information/index'
import UserReader from '../pages/User/Reader/index'
import BookBorrow from '../pages/Book/Borrow/index'
import BorrowHistory from '../pages/Book/History/index'
import _404 from '../pages/Error/_404'

class ContentRoute extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/admin/welcome' exact component={Welcome}/>
				<Route path='/admin' exact render={() => (<Redirect to='/admin/welcome'/>)}/>
				<PermissionRoute path='/admin/user' exact component={UserList}/>
				<PermissionRoute path='/admin/role' component={Role}/>
				<PermissionRoute path='/admin/menu' component={Menu}/>
				<Route path='/admin/personal' exact render={() => (<Redirect to='/admin/personal/basic'/>)}/>
				<Route path='/admin/personal/:page' component={Personal}/>
				<PermissionRoute path='/admin/book/types' component={BookTypes}/>
				<PermissionRoute path='/admin/book/information' component={BookInformation}/>
				<PermissionRoute path='/admin/book/borrow' component={BookBorrow}/>
				<PermissionRoute path='/admin/book/history' component={BorrowHistory}/>
				<PermissionRoute path='/admin/user/reader' component={UserReader}/>
				<Route path='*' component={_404}/>
			</Switch>
		)
	}
}

export default ContentRoute
