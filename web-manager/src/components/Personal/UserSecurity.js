import React, {Component} from 'react'
import {Form, Button, Row, Col, message, Spin} from 'antd'
import {fetchPutMySecurity} from '../../api/index'
import Map from './map'
import InputItem from "../Form/InputItem";
import styles from './index.module.less'

const FormItem = Form.Item

let ItemMap = JSON.parse(JSON.stringify(Map))

class UserSecurity extends Component {
	constructor(props) {
		super(props)
		// 增加密码自定义校验
		ItemMap.security.input[0].options.rules.push({validator: this.validateToNextPassword})
		ItemMap.security.input[1].options.rules.push({validator: this.compareToFirstPassword})
		ItemMap.security.input[1].props['onBlur'] = this.handleConfirmBlur
		this.state = {
			confirmDirty: false,
			spinning: false,
		}
	}
	
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	}
	
	handleConfirmBlur = (e) => {
		const value = e.target.value
		this.setState({confirmDirty: this.state.confirmDirty || !!value})
	}
	
	onSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({spinning: true})
				const putMySecurityRes = await fetchPutMySecurity(values)
				this.setState({spinning: false})
				if (putMySecurityRes.code === 0) {
					message.success('密码更新成功！')
					this.props.form.resetFields()
				} else {
					message.error('密码更新失败！')
				}
			}
		})
	}
	
	componentWillUnmount() {
		ItemMap = JSON.parse(JSON.stringify(Map))
	}
	
	render() {
		const form = this.props.form
		return (
			<Row className={styles.security}>
				<Col xxl={6} xl={10}>
					<Spin spinning={this.state.spinning}>
						<h2>安全设置</h2>
						<Form onSubmit={this.onSubmit}>
							{
								ItemMap.security.input.map(item => (
									<InputItem
										key={item.id}
										id={item.id}
										options={item.options}
										formItemParams={item.formItemParams}
										form={form}
										{...item.props}/>
								))
							}
							<FormItem>
								<Button type="primary" htmlType="submit">更新密码</Button>
							</FormItem>
						</Form>
					</Spin>
				</Col>
			</Row>
		
		)
	}
}

export default Form.create()(UserSecurity)
