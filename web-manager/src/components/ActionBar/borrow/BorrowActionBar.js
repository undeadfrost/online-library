import React, {Component} from 'react'
import {Form, Button} from 'antd'
import InputItem from '../../Form/InputItem'
import Map from './map'

class BorrowActionBar extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.getBookBorrows(values)
			}
		});
	}
	
	render() {
		const ItemMap = Map.borrow.input
		const {form} = this.props
		return (
			<Form layout={"inline"} onSubmit={this.handleSubmit}>
				{
					ItemMap.map(item => (
						<InputItem
							key={item.id}
							id={item.id}
							options={item.options}
							form={form}
							formItemParams={item.formItemParams}
							{...item.props}/>
					))
				}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
					>
						查询
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create()(BorrowActionBar)
