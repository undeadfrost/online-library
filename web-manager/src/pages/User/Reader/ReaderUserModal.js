import React, {Component} from 'react'
import {Form, Modal, message} from 'antd'
import InputItem from '../../../components/Form/InputItem'
import Map from './map'
import {fetchGetReaderUserInfo, fetchPutReaderUserInfo} from "../../../api"
import _ from 'lodash'


let ItemMap = {}

class ReaderUserModal extends Component {
	constructor(props) {
		super(props)
		// 增加密码自定义校验
		ItemMap = _.cloneDeep(Map.user)
		ItemMap.input[2].options.rules.push({validator: this.validateToNextPassword})
		ItemMap.input[3].options.rules.push({validator: this.compareToFirstPassword})
		ItemMap.input[3].props['onBlur'] = this.handleConfirmBlur
		this.state = {
			confirmDirty: false,
		}
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			console.log(values)
			if (!err) {
				values.userId = this.props.userId
				const putReaderUserRes = await fetchPutReaderUserInfo(values)
				if (putReaderUserRes.code === 0) {
					this.props.setModalVisible(false)
					this.props.form.resetFields()
					await this.props.getReaderUsers()
					message.success(putReaderUserRes.msg)
				} else {
					message.error(putReaderUserRes.msg)
				}
			}
		})
	}
	
	handleCancel = () => {
		this.props.setModalVisible(false)
	}
	
	async componentDidMount() {
		const readerUserInfo = await fetchGetReaderUserInfo({userId: this.props.userId})
		this.props.form.setFieldsValue(readerUserInfo)
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
	
	render() {
		const {form, title, visible} = this.props
		return (
			<Modal
				title={title}
				visible={visible}
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
		);
	}
}

export default Form.create()(ReaderUserModal)
