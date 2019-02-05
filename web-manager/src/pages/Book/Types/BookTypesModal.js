import React, {Component} from 'react'
import {Modal, Form, message} from 'antd'
import InputItem from '../../../components/Form/InputItem'
import Map from '../../../components/ActionBar/book/map'
import {fetchGetBookTypeInfo, fetchPutBookTypeInfo} from '../../../api/index'

class BookTypesModal extends Component {
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				const putBookTypeRes = await fetchPutBookTypeInfo({bookTypeId: this.props.bookTypeId, ...values})
				if (putBookTypeRes.code === 0) {
					await this.props.getBookType()
					message.success(putBookTypeRes.msg)
					this.props.setVisible(false)
					this.props.form.resetFields()
				} else {
					message.error(putBookTypeRes.msg)
				}
			}
		})
	}
	
	handleCancel = () => {
		this.props.setVisible(false)
	}
	
	async componentDidMount() {
		const {id, ...bookTypeInfo} = await fetchGetBookTypeInfo({bookTypeId: this.props.bookTypeId})
		this.props.form.setFieldsValue({...bookTypeInfo})
	}
	
	render() {
		const {title, visible, form} = this.props
		const ItemMap = Map.bookTypes
		return (
			<Modal
				visible={visible}
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
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(BookTypesModal)
