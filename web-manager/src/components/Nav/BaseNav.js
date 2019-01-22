import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Icon, Menu} from 'antd'

const SubMenu = Menu.SubMenu

class BaseNav extends Component {
	getMenuItems = (menusData) => {
		if (!menusData) {
			return [];
		}
		return menusData.map(item => (
			this.getSubMenuOrItem(item)
		))
	}
	
	getSubMenuOrItem = (item) => {
		if (item.submenus) {
			return (
				<SubMenu key={item.id} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
					{
						item.submenus.map(item => (
							<Menu.Item key={item.id}>
								<Link to={item.route}>
									<span>{item.name}</span>
								</Link>
							</Menu.Item>
						))
					}
				</SubMenu>
			)
		} else {
			return (
				<Menu.Item key={item.id}>
					<Link to={item.route}>
						<Icon type={item.icon}/>
						<span>{item.name}</span>
					</Link>
				</Menu.Item>
			)
		}
	}
	
	render() {
		const {navsData, ...props} = this.props
		return (
			<Menu
				theme="dark"
				mode="inline"
				{...props}
				onSelect={this.onSelect}>
				{this.getMenuItems(navsData)}
			</Menu>
		)
	}
}

export default BaseNav
