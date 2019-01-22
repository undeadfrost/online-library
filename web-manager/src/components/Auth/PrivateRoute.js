import React, {Component} from 'react'
import {Route} from 'react-router'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {message} from 'antd'

const mapStateToProps = state => ({
	isLogin: state.userData.isLogin
})

const mapDispatchToProps = dispatch => ({})

/**
 * 登录状态核验组件
 */
class PrivateRoute extends Component {
	componentDidMount() {
		const {isLogin} = this.props
		if (!isLogin) {
			message.error('無權使用，請先登入系統！', 5)
		}
	}
	
	render() {
		const {component: Component, ...rest} = this.props
		const {isLogin} = this.props
		return (
			<Route {...rest} render={props => (
				isLogin
					? <Component {...props}/>
					: <Redirect to={{pathname: '/admin/login', state: {from: props.location}}}/>
			)}/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
