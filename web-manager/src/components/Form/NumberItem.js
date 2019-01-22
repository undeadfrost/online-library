import React, {Component} from 'react'
import {Form, InputNumber} from 'antd'

const FormItem = Form.Item

class NumberItem extends Component {
	render() {
		const {id, options, form, formItemParams, ...customprops} = this.props
		const {getFieldDecorator} = form
		return (
			<FormItem {...formItemParams}>
				{getFieldDecorator(id, options)(<InputNumber {...customprops}/>)}
			</FormItem>
		)
	}
}

export default NumberItem
