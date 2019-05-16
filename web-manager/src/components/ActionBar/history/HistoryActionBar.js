import React, {Component} from 'react'
import {Form, Button, message} from 'antd'
import InputItem from '../../Form/InputItem'
import Map from './map'
import styles from "../index.module.less"

class HistoryActionBar extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.getBorrowHistorys(values)
			}
		});
	}
	
	render() {
		const ItemMap = Map.borrow.input
		const {form} = this.props
		return (
			<div className={styles.action_bar}>
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
			</div>
		)
	}
}


export default Form.create()(HistoryActionBar)
