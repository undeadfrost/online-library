import React, {Component} from 'react'
import {Modal, Form} from 'antd'
import {fetchGetBookInfo} from '../../../api/index'
import InputItem from '../../../components/Form/InputItem'
import SelectItem from '../../../components/Form/SelectItem'
import NumberItem from '../../../components/Form/NumberItem'
import Map from '../../../components/ActionBar/book/map'

class BookInfoModal extends Component {
	handleOk = () => {
	
	}
	
	handleCancel = () => {
		this.props.setVisible(0, false)
	}
	
	async componentDidMount() {
		const bookInfoRes = await fetchGetBookInfo({bookId: this.props.bookId})
		this.props.form.setFieldsValue({...bookInfoRes, book_type: {key: 1, label:'xx'}})
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
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(BookInfoModal)
