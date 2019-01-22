import React, {Component} from 'react'
import {Switch, Form} from 'antd'

const FormItem = Form.Item

class SwitchItem extends Component {
	render() {
		const {id, options, form, formItemParams, ...customprops} = this.props
		const {getFieldDecorator} = form
		return (
			<FormItem {...formItemParams}>
				{getFieldDecorator(id, options)(
					<Switch {...customprops}/>
				)}
			</FormItem>
		)
	}
}

export default SwitchItem
