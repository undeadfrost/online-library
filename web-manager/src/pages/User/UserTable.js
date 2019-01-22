import React, {Component} from 'react'
import {Divider, Popconfirm, Table, Icon, Badge, message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {updateUser} from '../../redux/actions/user.actions'
import {fetchDelUser} from "../../api";

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
}

const mapStateToProps = state => ({
	userList: state.userData.userList
})

const mapDispatchToProps = dispatch => bindActionCreators({updateUser}, dispatch)

const icon = <Icon type="question-circle-o" style={{color: 'red'}}/>

class UserTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
				title: 'ID',
				dataIndex: 'id',
			}, {
				title: '用户名',
				dataIndex: 'username',
			}, {
				title: '状态',
				dataIndex: 'status',
				render: (text) => (this.setStatus(text))
			}, {
				title: '手机号',
				dataIndex: 'mobile'
			}, {
				title: '创建时间',
				dataIndex: 'createdAt',
				render: (text) => (
					moment(text).format('YYYY-MM-DD HH:mm:ss')
				)
			}, {
				title: '操作',
				key: 'action',
				render: (text, record, index) => (<span>
					<a onClick={() => {
						props.setUserModalData(true, '配置用户', record.id)
					}}>配置</a>
					<Divider type="vertical"/>
					<Popconfirm placement="topRight" title="是否删除该用户?" cancelText={'取消'} okText={'确定'}
											icon={icon} onConfirm={this.delConfirm.bind(this, record.id)}>
					<a href="#">删除</a>
					</Popconfirm>
				</span>)
			}]
		}
	}
	
	setStatus = (status) => {
		if (status) {
			return <Badge status="success" text="启用"/>
		} else {
			return <Badge status="error" text="禁用"/>
		}
	}
	
	delConfirm = async (userId) => {
		const delUserRes = await fetchDelUser({userId: userId})
		if (delUserRes.code === 0) {
			message.success(delUserRes['msg'])
			await this.props.setUsers()
		} else {
			message.error(delUserRes['msg'])
		}
	}
	
	render() {
		const userList = this.props.userList
		return (
			<Table
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={userList}/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
