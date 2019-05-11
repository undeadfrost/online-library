import React, {Component} from 'react'
import {Route} from 'react-router'
import {message} from 'antd'
import PageLoading from '../Loading/PageLoading'
import _403 from '../../pages/Error/_403'
import {fetchRouteAuth} from '../../api/index'

/**
 * 路由权限核验组件
 */
class PermissionRoute extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			isAuthenticated: false,
		}
	}
	
	componentDidMount = async () => {
		await this.checkAuth()
	}
	
	componentDidUpdate = async (prevProps) => {
		if (prevProps.location.pathname !== this.props.location.pathname
			&& prevProps.location.pathname !== this.props.nodeRoute) {
			await this.checkAuth()
		}
	}
	
	checkAuth = async () => {
		let pathname = ''
		if (this.props.nodeRoute) {
			pathname = this.props.nodeRoute
		} else {
			pathname = this.props.location.pathname
		}
		let authRes = await fetchRouteAuth({route: pathname})
		if (!authRes['isAuth']) {
			message.error(authRes.msg, 5)
		}
		// 更新视图
		if (this.state.isAuthenticated !== authRes['isAuth'] || this.state !== false) {
			this.setState({isAuthenticated: authRes['isAuth'], isLoading: false})
		}
	}
	
	render() {
		const {component: Component, ...rest} = this.props
		const {isLoading, isAuthenticated} = this.state
		return (
			isLoading
				? <PageLoading/>
				: <Route {...rest} render={props => (
					isAuthenticated
						? <Component {...props}/>
						: <_403/>
				)}/>
		)
	}
}

export default PermissionRoute
