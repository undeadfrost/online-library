import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu} from 'antd'

class LeftNav extends Component {
	state = {
		selectedKeys: [],
		routes: ['basic', 'security']
	}
	
	componentDidMount() {
		const pathname = this.props.location.pathname
		this.state.routes.forEach(route => {
			if (pathname.includes(route)) {
				this.setState({selectedKeys: [route]})
			}
			
		})
	}
	
	selectKey = ({key}) => {
		this.setState({selectedKeys: [key]})
	}
	
	render() {
		return (
			<Menu
				selectedKeys={this.state.selectedKeys}
				mode="inline"
				onClick={this.selectKey}>
				<Menu.Item key="basic">
					<Link to='/admin/personal/basic'>基本设置</Link>
				</Menu.Item>
				<Menu.Item key="security">
					<Link to='/admin/personal/security'>安全设置</Link>
				</Menu.Item>
			</Menu>
		)
	}
}

export default withRouter(LeftNav)
