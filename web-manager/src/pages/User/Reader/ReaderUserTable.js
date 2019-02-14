import React, {Component} from 'react'
import {Table, Divider, Popconfirm, Icon, message} from 'antd'
import {connect} from 'react-redux'
import moment from 'moment'
import {fetchDelReaderUser} from '../../../api/index'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
}

const icon = <Icon type="question-circle-o" style={{color: 'red'}}/>

const mapStateToProps = state => ({
	readerUserList: state.userData.readerUserList
})

class ReaderUserTable extends Component {
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: '真实姓名',
			dataIndex: 'realName',
		}, {
			title: '身份证号',
			dataIndex: 'idCard',
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
					<a>配置</a>
					<Divider type="vertical"/>
					<Popconfirm placement="topRight" title="是否删除该用户?" cancelText={'取消'} okText={'确定'}
											icon={icon} onConfirm={this.delConfirm.bind(this, record.id)}>
					<a href="#">删除</a>
					</Popconfirm>
				</span>)
		}]
	}
	
	delConfirm = async (userId) => {
		const delReaderUserRes = await fetchDelReaderUser({userId})
		if (delReaderUserRes.code === 0) {
			message.success(delReaderUserRes.msg)
			await this.props.getReaderUsers()
		} else {
			message.error(delReaderUserRes.msg)
		}
	}
	
	render() {
		const {readerUserList} = this.props
		return (
			<Table
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={readerUserList} rowKey={'id'}/>
		)
	}
}

export default connect(mapStateToProps)(ReaderUserTable)
