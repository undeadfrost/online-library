import React, {Component} from 'react'
import {Form, Modal, Input, Button, message} from 'antd'
import Map from './map'
import styles from './index.module.less'
import InputItem from "../Form/InputItem"
import SwitchItem from "../Form/SwitchItem"
import {fetchAddUser, fetchGetRole} from '../../api/index'
import SelectItem from "../Form/SelectItem"

const Search = Input.Search

class UserActionBar extends Component {
	constructor(props) {
		super(props)
		// 增加密码自定义校验
		Map.user.input[1].options.rules.push({validator: this.validateToNextPassword})
		Map.user.input[2].options.rules.push({validator: this.compareToFirstPassword})
		Map.user.input[2].props['onBlur'] = this.handleConfirmBlur
		this.state = {
			confirmDirty: false,
			visible: false,
			confirmLoading: false,
			roles: []
		}
	}
	
	showModal = () => {
		this.setState({visible: true})
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
	
	onSearch = async (value) => {
		await this.props.setUsers({searchKey: value})
	}
	
	handleOk = async () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({confirmLoading: true})
				if (values.roles) {
					values.roleIds = values.roles.map(item => item.key)
				}
				delete values.roles
				let addUserRes = await fetchAddUser(values)
				this.setState({confirmLoading: false})
				if (addUserRes.code === 0) {
					this.setState({visible: false})
					this.props.form.resetFields()
					await this.props.setUsers()
					message.success(addUserRes['msg'])
				} else {
					message.error(addUserRes['msg'])
				}
			}
		})
	}
	
	handleCancel = () => {
		this.setState({visible: false})
		this.props.form.resetFields()
	}
	
	async componentDidMount() {
		let roleRes = await fetchGetRole()
		roleRes = roleRes.filter(item => (item.data = item.roleName))
		this.setState({roles: roleRes})
	}
	
	render() {
		const form = this.props.form
		const ItemMap = Map.user
		const selectItem = ItemMap.select
		console.log(this.state.roles)
		return (
			<div className={styles.action_bar}>
				<Search
					className={styles.search}
					placeholder="input search text"
					onSearch={this.onSearch}
					enterButton/>
				<Button type="primary" onClick={this.showModal}>
					新增
				</Button>
				<Modal
					title={this.props.title}
					visible={this.state.visible}
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
			</div>
		)
	}
}

export default Form.create()(UserActionBar)
