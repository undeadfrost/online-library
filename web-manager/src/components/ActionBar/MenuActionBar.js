import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, Form, Radio, message} from "antd"
import CatalogForm from './menu/CatalogForm'
import MenuForm from "./menu/MenuForm"
import {fetchAddMenu} from "../../api/index"
import styles from "./index.module.less"

const mapStateToProps = state => ({menusList: state.menusData.menusList})

class MenuActionBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			radio: 'catalog'
		}
	}
	
	showModal = () => {
		this.setState({visible: true})
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				if (this.state.radio === 'catalog') {
					values.parent = 0
					values.type = 0
				} else {
					values.type = 1
					values.parent = values.parentMenu.key
				}
				let addMenuRes = await fetchAddMenu(values)
				if (addMenuRes.code === 0) {
					await this.props.getMenus()
					message.success(addMenuRes.msg)
					this.setState({visible: false})
					this.props.form.resetFields()
				}
			}
		})
	}
	
	handleCancel = () => {
		this.setState({visible: false})
		this.props.form.resetFields()
	}
	
	onChange = (e) => {
		this.setState({radio: e.target.value})
	}
	
	catalogForm = () => {
		const form = this.props.form
		if (this.state.radio === 'catalog') {
			return (
				<Form>
					<CatalogForm form={form}/>
				</Form>
			)
		} else {
			let topMenu = this.props.menusList
			topMenu = topMenu.filter(item => {
				item.data = item.name
				return item.parent === 0 && item.type === 0
			})
			topMenu.unshift({id: 0, data: '一级菜单'})
			return (
				<Form>
					<MenuForm form={form} selectData={topMenu}/>
				</Form>
			)
		}
	}
	
	render() {
		return (
			<div className={styles.action_bar}>
				<Button type="primary" onClick={this.showModal}>
					新增
				</Button>
				<Modal
					title={this.props.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}>
					<Radio.Group
						className={styles.menu_radio}
						defaultValue={'catalog'}
						buttonStyle="solid"
						onChange={this.onChange}>
						<Radio.Button value="catalog">目录</Radio.Button>
						<Radio.Button value="menu">菜单</Radio.Button>
					</Radio.Group>
					{this.catalogForm()}
				</Modal>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Form.create()(MenuActionBar))
