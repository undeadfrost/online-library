import React, {Component} from 'react'
import {Form, Button, Row, Col, message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchLogin} from '../../api/index'
import {updateUser} from '../../redux/actions/user.actions'
import LoginItem from "../../components/Login/LoginItem";
import styles from './index.module.less'

const FormItem = Form.Item;

const mapStateToProps = state => ({})

// 获取redux中actions
const mapDispatchToProps = dispatch => bindActionCreators({
	updateUser
}, dispatch)

class Login extends Component {
	state = {
		btnLoading: false
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({btnLoading: true})
				fetchLogin(values).then(data => {
					this.setState({btnLoading: false})
					if (data.code === 0) {
						this.props.updateUser({accessToken: data.token, isLogin: true, userInfo: data.userInfo})
						if (this.props.location.state) {
							this.props.history.push(this.props.location.state.from.pathname)
						} else {
							this.props.history.push('/admin/welcome')
						}
					} else {
						message.error(data.msg)
					}
				})
			}
		});
	}
	
	render() {
		return (
			<Row type="flex" justify="center" align="middle" className={styles.login}>
				<Col xs={20} sm={16} md={12} lg={8} xl={6} xxl={4}>
					<Form onSubmit={this.handleSubmit}>
						<LoginItem form={this.props.form}/>
						<FormItem>
							<Button loading={this.state.btnLoading} type="primary" htmlType="submit" size="large"
											className={styles.submit}>
								Log in
							</Button>
						</FormItem>
					</Form>
				</Col>
			</Row>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
