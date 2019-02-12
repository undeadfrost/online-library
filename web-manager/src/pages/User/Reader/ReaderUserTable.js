import React, {Component} from 'react'
import {Table} from 'antd'
import {connect} from 'react-redux'
import moment from 'moment'

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
		}]
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
