import React, { Component } from 'react'
import { Table, Divider, Popconfirm, message } from 'antd'
import { connect } from 'react-redux'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const mapStateToProps = state => ({ borrowList: state.borrowData.borrowList })

class BorrowTable extends Component {
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: '图书编号',
			dataIndex: 'book',
			render: (book) => (
				<span>{book.number}</span>
			)
		}, {
			title: '书名',
			dataIndex: 'book',
			render: (book) => (
				<span>{book.bname}</span>
			)
		}, {
			title: '作者',
			dataIndex: 'book',
			render: (book) => (
				<span>{book.author}</span>
			)
		}, {
			title: '出版社',
			dataIndex: 'book',
			render: (book) => (
				<span>{book.publishing}</span>
			)
		}, {
			title: '借阅人',
			dataIndex: 'user_reader',
			render: (user) => (
				<span>{user.realName}</span>
			)
		}, {
			title: '身份证',
			dataIndex: 'user_reader',
			render: (user) => (
				<span>{user.idCard}</span>
			)
		}, {
			title: '手机号',
			dataIndex: 'user_reader',
			render: (user) => (
				<span>{user.mobile}</span>
			)
		}, {
			title: '操作',
			key: 'action',
			width: 110,
			// fixed: 'right',
			render: (text, record, index) => (<span>
				<a onClick={() => {
					this.configuration(record)
				}}>配置</a>
				<Divider type="vertical" />
				<Popconfirm
					placement="topRight"
					title="是否删除该菜单?"
					cancelText={'取消'}
					okText={'确定'}
					onConfirm={this.delConfirm.bind(this, record.id)}>
					<a href="#">删除</a>
				</Popconfirm>
			</span>)
		}]
	}

	delConfirm = (id) => {

	}

	render() {
		const dataSource = this.props.borrowList
		return (
			<Table
				rowKey="id"
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={dataSource} />
		)
	}
}

export default connect(mapStateToProps)(BorrowTable)
