import React, {Component, Fragment} from 'react'
import {Form, Button, Modal, message} from 'antd'
import InputItem from '../../Form/InputItem'
import Map from './map'
import styles from "../index.module.less"
import {fetchAddBookBorrow} from '../../../api'

class BorrowActionBar extends Component {
	borrowForm = React.createRef()
	
	state = {
		visible: false,
		error: ''
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.getBookBorrows(values)
			}
		});
	}
	
	handleOk = () => {
		this.borrowForm.current.validateFields((err, values) => {
			if (!err) {
				fetchAddBookBorrow(values).then(res => {
					if (res.code === 0) {
						this.setState({visible: false})
						this.props.getBookBorrows()
						message.success(res.msg)
					} else {
						this.setState({error: res.msg})
					}
				})
			}
		})
	}
	
	handleCancel = () => {
		this.setState({visible: false, error: ''})
	}
	
	showModal = () => {
		this.setState({visible: true})
	}
	
	render() {
		const ItemMap = Map.borrow.input
		const {form} = this.props
		return (
			<div className={styles.action_bar}>
				<Form layout={"inline"} onSubmit={this.handleSubmit}>
					<Form.Item>
						<Button type="primary" onClick={this.showModal}>借阅</Button>
					</Form.Item>
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
				<Modal
					title={this.props.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}>
					<Fragment>
						<BorrowFormWith ref={this.borrowForm}/>
						<p style={{color: 'red', textAlign: 'center'}}>{this.state.error}</p>
					</Fragment>
				</Modal>
			</div>
		)
	}
}

class BorrowForm extends Component {
	render() {
		const ItemMap = Map.borrow.form
		const {form, ...otherProps} = this.props
		return (
			<Form>
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
			</Form>
		)
	}
}

const BorrowFormWith = Form.create()(BorrowForm)

export default Form.create()(BorrowActionBar)
