import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Layout} from 'antd'
import BaseMenu from '../components/Nav/BaseNav'
import styles from './index.module.less'
import ContentRoute from './ContentRoute'
import HeaderView from "./HeaderView"

const {Sider, Content} = Layout

class BasicLayout extends Component {
	constructor(props) {
		super(props)
		const clientWidth = document.body.clientWidth
		this.state = {
			collapsed: clientWidth < 1000 ? true : false,
			openKeys: [],
			selectedKeys: []
		}
	}
	
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}
	
	handleResize = (e) => {
		if (e.target.innerWidth <= 1000 && this.state.collapsed === false) {
			this.setState({collapsed: true})
		}
		if (e.target.innerWidth > 1000 && this.state.collapsed === true) {
			this.setState({collapsed: false})
		}
	}
	
	getKeys = () => {
		let pathname = this.props.location.pathname
		// 修改进入/admin或/admin/跳转后导航无法高亮问题
		if (pathname === '/admin/' || pathname === '/admin') pathname = '/admin/welcome'
		const navsData = this.props.navsData
		let openKeys = []
		let selectedKeys = []
		for (let i = 0; i < navsData.length; i++) {
			if (pathname.includes(navsData[i].route)) {
				selectedKeys.push(navsData[i].id.toString())
				break
			}
			const submenus = navsData[i].submenus
			if (submenus) {
				for (let j = 0; j < submenus.length; j++) {
					if (submenus[j].route === pathname) {
						openKeys.push(navsData[i].id.toString())
						selectedKeys.push(submenus[j].id.toString())
						break
					}
				}
			}
		}
		this.setState({
			openKeys: openKeys,
			selectedKeys: selectedKeys
		})
	}
	
	onClick = ({item, key, keyPath}) => {
		console.log(keyPath)
		this.setState({selectedKeys: [key]})
	}
	
	// 菜单只能展开一项
	onOpenChange = (openKeys) => {
		if (openKeys.length <= 1) {
			this.setState({openKeys: openKeys});
		} else {
			this.setState({openKeys: [openKeys[openKeys.length - 1]]})
		}
	}
	
	componentDidMount() {
		this.getKeys()
		window.addEventListener('resize', this.handleResize.bind(this))
	}
	
	render() {
		const baseMenuProps = this.state.collapsed ? {} : {openKeys: this.state.openKeys}
		return (
			<Layout className={styles.layout}>
				<Sider
					className={styles.sider}
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className={styles.logo}/>
					<BaseMenu
						navsData={this.props.navsData}
						selectedKeys={this.state.selectedKeys}
						{...baseMenuProps}
						onClick={this.onClick}
						onOpenChange={this.onOpenChange}/>
				</Sider>
				<Layout className={styles.right}>
					<HeaderView collapsed={this.state.collapsed} toggle={this.toggle}/>
					<Content className={styles.content}>
						<ContentRoute/>
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default withRouter(BasicLayout)
