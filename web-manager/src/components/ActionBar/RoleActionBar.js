import React, {Component} from 'react'
import {Button, Input, Modal, Form, message} from "antd"
import {fetchAddRole} from '../../api/index'
import InputItem from '../Form/InputItem'
import ItemMap from './map'
import styles from './index.module.less'

const Search = Input.Search

class RoleActionBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false
		}
	}
	
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({confirmLoading: true})
				let addRoleRes = await fetchAddRole(values)
				this.setState({confirmLoading: false})
				if (addRoleRes.code === 0) {
					await this.props.setRoles()
					message.success(addRoleRes.msg)
					this.setState({visible: false})
					this.props.form.resetFields()
				} else {
					message.error(addRoleRes.msg)
				}
			}
		})
	}
	
	handleCancel = () => {
		this.setState({
			visible: false,
		});
		this.props.form.resetFields()
	}
	
	onSearch = async (value) => {
		await this.props.setRoles({roleName: value})
	}
	
	render() {
		const form = this.props.form
		return (
			<div className={styles.action_bar}>
				<Search
					className={styles.search}
					placeholder="input search text"
					onSearch={this.onSearch}
					enterButton
				/>
				<Button type="primary" onClick={this.showModal}>
					新增
				</Button>
				<Modal
					title={this.props.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					confirmLoading={this.state.confirmLoading}
				>
					<Form onSubmit={this.handleOk}>
						{
							ItemMap.role.map(item => (
								<InputItem
									key={item.id}
									id={item.id}
									options={item.options}
									formItemParams={item.formItemParams}
									form={form}
									{...item.props}/>
							))
						}
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Form.create()(RoleActionBar)
