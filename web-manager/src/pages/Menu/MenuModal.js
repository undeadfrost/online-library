import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Form} from 'antd'
import {fetchPutMenuInfo, fetchGetMenuInfo} from '../../api/index'
import CatalogForm from '../../components/ActionBar/menu/CatalogForm'
import MenuForm from '../../components/ActionBar/menu/MenuForm'

const mapStateToProps = state => ({menusList: state.menusData.menusList})

class MenuModal extends Component {
	state = {
		type: 0
	}
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				if (values.menuRoute) {
					values.parentMenu = values.parentMenu.key
				}
				values.type = this.state.type
				values.menuId = this.props.menuId
				const putMenuInfoRes = await fetchPutMenuInfo(values)
				this.props.setVisible(false)
				this.props.form.resetFields()
				this.props.getMenus()
			}
		})
	}
	
	handleCancel = () => {
		this.props.setVisible(false)
	}
	
	async componentDidMount() {
		const menuInfo = (await fetchGetMenuInfo({menuId: this.props.menuId}))['menu']
		const type = menuInfo['type']
		this.setState({type: type})
		let fieldsValue = {}
		if (type === 0) {
			fieldsValue = {
				routeName: menuInfo['name'],
				icon: menuInfo['icon'],
				orderNum: menuInfo['orderNum']
			}
		} else {
			fieldsValue = {
				routeName: menuInfo['name'],
				menuRoute: menuInfo['route'],
				menuPermission: menuInfo['permission'],
				icon: menuInfo['icon'],
				orderNum: menuInfo['orderNum']
			}
			if (menuInfo['parent'] !== 0) {
				let parentMenu = this.props.menusList.filter(item => item.id === menuInfo['parent'])[0]
				fieldsValue.parentMenu = {key: parentMenu.id, label: parentMenu.name}
			}
		}
		this.props.form.setFieldsValue(fieldsValue)
	}
	
	render() {
		const visible = this.props.visible
		const title = this.props.title
		const form = this.props.form
		let topMenu = this.props.menusList
		topMenu = topMenu.filter(item => {
			item.data = item.name
			return item.parent === 0 && item.type === 0
		})
		topMenu.unshift({id: 0, data: '一级菜单'})
		return (
			<Modal
				title={title}
				visible={visible}
				onOk={this.handleOk}
				onCancel={this.handleCancel}>
				<Form>
					{
						this.state.type === 0
							? <CatalogForm form={form}/>
							: <MenuForm form={form} selectData={topMenu}/>
					}
				</Form>
			</Modal>
		)
	}
}

export default connect(mapStateToProps)(Form.create()(MenuModal))
