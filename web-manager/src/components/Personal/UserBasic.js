import React, {Component} from 'react'
import {Form, Button, Row, Col, Upload, Icon, message, Spin} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateUser} from '../../redux/actions/user.actions'
import {fetchPutMyBasic} from '../../api/index'
import InputItem from "../Form/InputItem";
import ItemMap from './map'
import styles from './index.module.less'
import config from '../../config/index'

const FormItem = Form.Item

const mapStateToProps = state => ({
	userInfo: state.userData.userInfo,
	accessToken: state.userData.accessToken
})

const mapDispatchToProps = dispatch => bindActionCreators({
	updateUser
}, dispatch)

class UserBasic extends Component {
	state = {
		spinning: false
	}
	
	onSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({spinning: true})
				const putMyBasicRes = await fetchPutMyBasic(values)
				this.setState({spinning: false})
				if (putMyBasicRes.code === 0) {
					this.props.updateUser({userInfo: putMyBasicRes.userInfo})
					message.success('基本信息更新成功')
				} else {
					message.error('基本信息更新失败！')
				}
			}
		})
	}
	
	onChange = (info) => {
		if (info['file'].status !== 'uploading') {
		}
		if (info['file'].status === 'done') {
			const response = info.file.response
			if (response.code === 0) {
				this.props.updateUser({userInfo: response.userInfo})
				message.success('头像更新成功！')
			} else {
				message.error('头像更新失败！')
			}
		} else if (info['file'].status === 'error') {
			message.error('头像更新失败！');
		}
	}
	
	componentDidMount() {
		const userInfo = this.props.userInfo
		this.props.form.setFieldsValue({
			username: userInfo.username,
			mobile: userInfo.mobile
		})
	}
	
	render() {
		const form = this.props.form
		const headers = {Authorization: 'Bearer ' + this.props.accessToken}
		return (
			<Row className={styles.basic}>
				<Col span={8}>
					<Spin spinning={this.state.spinning}>
						<h2>基本设置</h2>
						<Form onSubmit={this.onSubmit}>
							{
								ItemMap.basic.input.map(item => (
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
								<Button type="primary" htmlType="submit">更新基本信息</Button>
							</FormItem>
						</Form>
					</Spin>
				</Col>
				<Col span={6} className={styles.head_portrait}>
					<h3>头像</h3>
					<img src={`${config.baseUrl}${this.props.userInfo.portrait}`} alt={"头像"}/>
					<Upload
						headers={headers}
						action={config.uploadApi}
						showUploadList={false}
						onChange={this.onChange}>
						<Button className={styles.upload}>
							<Icon type="upload"/> 更换头像
						</Button>
					</Upload>
				</Col>
			</Row>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserBasic))
