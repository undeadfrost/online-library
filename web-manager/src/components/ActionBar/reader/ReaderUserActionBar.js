import React, {Component} from 'react'
import {Input, Button, Modal, Form, message} from 'antd'
import styles from '../index.module.less'
import InputItem from '../../Form/InputItem'
import {fetchAddReaderUser} from '../../../api/index'
import Map from './map'
import _ from 'lodash'

const Search = Input.Search
let ItemMap = _.cloneDeep(Map.user)

class ReaderUserActionBar extends Component {
	constructor(props) {
		super(props)
		// 增加密码自定义校验
		ItemMap.input[2].options.rules.push({validator: this.validateToNextPassword})
		ItemMap.input[3].options.rules.push({validator: this.compareToFirstPassword})
		ItemMap.input[3].props['onBlur'] = this.handleConfirmBlur
		this.state = {
			visible: false,
			confirmDirty: false,
		}
	}
	
	onSearch = async (value) => {
		await this.props.getReaderUsers({searchKey: value})
	}
	
	showModal = () => {
		this.setState({visible: true})
	}
	
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	}
	
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	
	handleConfirmBlur = (e) => {
		const value = e.target.value
		this.setState({confirmDirty: this.state.confirmDirty || !!value})
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				const addReaderUserRes = await fetchAddReaderUser(values)
				if (addReaderUserRes.code === 0) {
					this.setState({visible: false})
					this.props.form.resetFields()
					await this.props.getReaderUsers()
					message.success(addReaderUserRes.msg)
				} else {
					message.error(addReaderUserRes.msg)
				}
			}
		})
	}
	
	handleCancel = () => {
		this.setState({visible: false})
		this.props.form.resetFields()
	}
	
	render() {
		const {form, title} = this.props
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
					title={title}
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
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Form.create()(ReaderUserActionBar)
