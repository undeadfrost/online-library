import React, {Component} from 'react'
import {Modal, Form, message} from 'antd'
import {fetchGetBookInfo, fetchPutBookInfo} from '../../../api/index'
import InputItem from '../../../components/Form/InputItem'
import SelectItem from '../../../components/Form/SelectItem'
import NumberItem from '../../../components/Form/NumberItem'
import ImageUploadItem from '../../../components/Form/ImageUploadItem'
import {objectToFormData} from '../../../common/utils'
import Map from '../../../components/ActionBar/book/map'

class BookInfoModal extends Component {
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				const {book_type, ...params} = values
				const putBookInfoRes = await fetchPutBookInfo(objectToFormData({
					bookId: this.props.bookId,
					bookTypeId: book_type.key,
					...params
				}))
				if (putBookInfoRes.code === 0) {
					await this.props.getBookList()
					message.success(putBookInfoRes.msg)
					this.props.setVisible(false)
					this.props.form.resetFields()
				} else {
					message.error(putBookInfoRes.msg)
				}
			}
		})
	}
	
	handleCancel = () => {
		this.props.setVisible(0, false)
	}
	
	async componentDidMount() {
		const {id, bookTypeId, book_type, ...bookInfoRes} = await fetchGetBookInfo({bookId: this.props.bookId})
		this.props.form.setFieldsValue({...bookInfoRes, book_type: {key: book_type.id, label: book_type.typeName}})
	}
	
	render() {
		const {title, visible, form} = this.props
		const ItemMap = Map.book
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
					{
						<NumberItem
							key={ItemMap.number.id}
							id={ItemMap.number.id}
							options={ItemMap.number.options}
							form={form}
							formItemParams={ItemMap.number.formItemParams}
							{...ItemMap.number.props}/>
					}
					{
						ItemMap.select.map(item => (
							<SelectItem
								key={item.id}
								id={item.id}
								options={item.options}
								form={form}
								formItemParams={item.formItemParams}
								selectData={this.props.bookTypes}/>
						))
					}
					<ImageUploadItem
						key={ItemMap.upload.id}
						id={ItemMap.upload.id}
						form={form}
						options={ItemMap.upload.options}
						formItemParams={ItemMap.upload.formItemParams}/>
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(BookInfoModal)
