import React, {Component} from 'react'
import {Form, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item

class SelectItem extends Component {
	render() {
		const {id, options, form, formItemParams, selectData, ...customprops} = this.props
		const {getFieldDecorator} = form
		return (
			<FormItem {...formItemParams}>
				{getFieldDecorator(id, options)(
					<Select labelInValue {...customprops}>
						{selectData.map(item => (
							<Option key={item.id}>{item.data}</Option>
						))}
					</Select>
				)}
			</FormItem>
		)
	}
}

export default SelectItem
