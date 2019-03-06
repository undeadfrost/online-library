import React, {Component} from 'react'
import {Form, Modal} from 'antd'
import InputItem from '../../../components/Form/InputItem'
import Map from '../../../components/ActionBar/reader/map'

class ReaderUserModal extends Component {
	handleOk = () => {
	
	}
	
	handleCancel = () => {
	
	}
	
	render() {
		const ItemMap = Map.user
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

export default ReaderUserModal
