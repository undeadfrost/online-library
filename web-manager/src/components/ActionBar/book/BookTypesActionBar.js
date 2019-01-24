import React, {Component} from 'react'
import {Input, Button, Modal, Form, message} from 'antd'
import InputItem from "../../Form/InputItem"
import {fetchAddBookType} from '../../../api/index'
import styles from '../index.module.less'
import Map from './map'

const Search = Input.Search

class BookTypesActionBar extends Component {
	state = {
		visible: false,
		confirmLoading: false
	}
	
	onSearch = async (value) => {
		await this.props.getBookTypes({searchKey: value})
	}
	
	showModal = () => {
		this.setState({visible: true})
	}
	
	handleOk = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({confirmLoading: true})
				fetchAddBookType(values).then(async res => {
					this.setState({confirmLoading: false})
					if (res.code === 0) {
						this.setState({visible: false})
						this.props.form.resetFields()
						await this.props.getBookTypes()
						message.success(res['msg'])
					} else {
						message.error(res['msg'])
					}
				})
			}
		})
	}
	
	handleCancel = () => {
		this.setState({visible: false})
		this.props.form.resetFields()
	}
	
	render() {
		const ItemMap = Map.bookTypes
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
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Form.create()(BookTypesActionBar)
