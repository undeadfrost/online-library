import React, {Component} from 'react'
import {Input, Button, Modal, Form} from 'antd'
import styles from '../index.module.less'
import InputItem from '../../Form/InputItem'
import NumberItem from '../../Form/NumberItem'
import SelectItem from '../../Form/SelectItem'
import Map from './map'

const Search = Input.Search

class BookActionBar extends Component {
	state = {
		visible: false
	}
	
	onSearch = (value) => {
	}
	
	showModal = () => {
		this.setState({visible: true})
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
			}
		})
	}
	handleCancel = () => {
		this.setState({visible: false})
	}
	
	render() {
		const ItemMap = Map.book
		const form = this.props.form
		return (
			<div className={styles.action_bar}>
				<Search
					className={styles.search}
					placeholder="input search text"
					onSearch={this.onSearch}
					enterButton/>
				<Button type="primary" onClick={this.showModal}>
					新增
				</Button>
				<Modal
					title={this.props.title}
					visible={this.state.visible}
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
			</div>
		)
	}
}

export default Form.create()(BookActionBar)
