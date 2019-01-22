import React, {Component} from 'react'
import {Route, Switch} from 'react-router'
import PrivateRoute from '../components/Auth/PrivateRoute'
import Login from './User/Login'
import Layout from '../layouts/index'
import _404 from './Error/_404'

class App extends Component {
	render() {
		return (
			<Switch>
				<Route path='/admin/login' exact component={Login}/>
				<PrivateRoute path='/admin' component={Layout}/>
				<Route path='*' component={_404}/>
			</Switch>
		)
	}
}

export default App
