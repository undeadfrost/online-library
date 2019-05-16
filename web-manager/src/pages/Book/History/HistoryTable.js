import React, {Component} from 'react'
import {Table, message} from 'antd'
import {connect} from 'react-redux'
import {fetchDelBookBorrow} from '../../../api/index'
import moment from 'moment'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const mapStateToProps = state => ({historyList: state.borrowData.historyList})

class HistoryTable extends Component {
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: '图书编号',
			dataIndex: 'book.number',
			render: (number) => (
				<span>{number}</span>
			)
		}, {
			title: '书名',
			dataIndex: 'book.bname',
			render: (bname) => (
				<span>{bname}</span>
			)
		}, {
			title: '作者',
			dataIndex: 'book.author',
			render: (author) => (
				<span>{author}</span>
			)
		}, {
			title: '出版社',
			dataIndex: 'book.publishing',
			render: (publishing) => (
				<span>{publishing}</span>
			)
		}, {
			title: '借阅人',
			dataIndex: 'user_reader.realName',
			render: (realName) => (
				<span>{realName}</span>
			)
		}, {
			title: '身份证',
			dataIndex: 'user_reader.idCard',
			render: (idCard) => (
				<span>{idCard}</span>
			)
		}, {
			title: '手机号',
			dataIndex: 'user_reader.mobile',
			render: (mobile) => (
				<span>{mobile}</span>
			)
		}, {
			title: '借阅时间',
			dataIndex: 'borrow_time',
			render: (text) => (
				moment(text).format('YYYY-MM-DD HH:mm:ss')
			)
		}, {
			title: '归还时间',
			dataIndex: 'return_time',
			render: (text) => (
				moment(text).format('YYYY-MM-DD HH:mm:ss')
			)
		}]
	}
	
	configuration = (record) => {
		const {id} = record
		this.props.history.push(`/admin/book/borrow/${id}`)
	}
	
	delConfirm = (id) => {
		fetchDelBookBorrow({borrowId: id}).then(res => {
			if (res.code === 0) {
				this.props.getBookBorrows()
			} else {
				message.error(res.msg)
			}
		})
	}
	
	render() {
		const dataSource = this.props.historyList
		return (
			<Table
				rowKey="id"
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={dataSource}/>
		)
	}
}

export default connect(mapStateToProps)(HistoryTable)
