import React, {Component} from 'react'
import {Modal, Form, message} from 'antd'
import InputItem from '../../components/Form/InputItem'
import SwitchItem from '../../components/Form/SwitchItem'
import SelectItem from '../../components/Form/SelectItem'
import ItemMap from '../../components/Form/userMap'
import {fetchGetRole, fetchGetUserInfo, fetchPutUserInfo} from '../../api/index'

class UserModal extends Component {
	constructor(props) {
		super(props)
		// 增加密码自定义校验
		ItemMap.input[1].options.rules.push({validator: this.validateToNextPassword})
		ItemMap.input[2].options.rules.push({validator: this.compareToFirstPassword})
		ItemMap.input[2].props['onBlur'] = this.handleConfirmBlur
		this.state = {
			roles: []
		}
	}
	
	handleOk = () => {
		const userId = this.props.userId
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				values.userId = userId
				values.roleIds = values.roles.map(item => item.key)
				delete values.roles
				const putUserRes = await fetchPutUserInfo(values)
				if (putUserRes.code === 0) {
					this.props.setVisible(false)
					this.props.form.resetFields()
					await this.props.setUsers()
					message.success(putUserRes['msg'])
				} else {
					message.error(putUserRes['msg'])
				}
			}
		})
	}
	
	handleCancel = () => {
		this.props.setVisible(false)
	}
	
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	}
	
	handleConfirmBlur = (e) => {
		const value = e.target.value
		this.setState({confirmDirty: this.state.confirmDirty || !!value})
	}
	
	async componentDidMount() {
		let roleRes = await fetchGetRole()
		roleRes = roleRes.filter(item => (item.data = item.roleName))
		this.setState({roles: roleRes})
		let userInfoRes = await fetchGetUserInfo({userId: this.props.userId})
		const userInfo = userInfoRes['userInfo']
		let roles = userInfo['roles'].map(item => ({key: item.id, label: item.roleName}))
		this.props.form.setFieldsValue({
			username: userInfo.username,
			mobile: userInfo.mobile,
			status: userInfo.status,
			roles: roles
		})
	}
	
	render() {
		const form = this.props.form
		const visible = this.props.visible
		const title = this.props.title
		const selectItem = ItemMap.select
		return (
			<Modal visible={visible}
						 title={title}
						 onOk={this.handleOk}
						 onCancel={this.handleCancel}>
				<Form onSubmit={this.handleOk}>
					{
						ItemMap.input.map(item => (
							<InputItem
								key={item.id}
								id={item.id}
								options={item.options}
								form={form}
								formItemParams={item.formItemParams}
								{...item.props}/>
						))
					}
					{
						ItemMap.switch.map(item => (
							<SwitchItem
								key={item.id}
								id={item.id}
								options={item.options}
								form={form}
								formItemParams={item.formItemParams}
								{...item.props}/>
						))
					}
					<SelectItem
						mode="multiple"
						id={selectItem.id}
						options={selectItem.options}
						form={form}
						formItemParams={selectItem.formItemParams}
						selectData={this.state.roles}/>
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(UserModal)
