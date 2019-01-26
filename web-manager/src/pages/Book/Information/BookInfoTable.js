import React, {Component} from 'react'
import {Table, Divider, Popconfirm, message} from 'antd'
import {connect} from 'react-redux'
import {fetchDelBook} from '../../../api/index'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const mapStateToProps = state => ({bookList: state.booksData.bookList})

class BookInfoTable extends Component {
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: '编号',
			dataIndex: 'number',
		}, {
			title: '书名',
			dataIndex: 'bname',
		}, {
			title: '作者',
			dataIndex: 'author',
		}, {
			title: '分类',
			dataIndex: 'book_type',
			render: (text) => (
				<span>{text.typeName}</span>
			)
		}, {
			title: '出版社',
			dataIndex: 'publishing',
		}, {
			title: '借阅期限',
			dataIndex: 'timeLimit',
			render: (text) => (
				<span>{`${text}天`}</span>
			)
		}, {
			title: '操作',
			key: 'action',
			width: 110,
			fixed: 'right',
			render: (text, record, index) => (<span>
					<a onClick={() => {
						this.configuration(record)
					}}>配置</a>
					<Divider type="vertical"/>
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
	
	configuration = (record) => {
	
	}
	
	delConfirm = async (bookId) => {
		const delBookRes = await fetchDelBook({bookId: bookId})
		if (delBookRes.code === 1) {
			message.error(delBookRes['msg'])
		}
		await this.props.getBookList()
	}
	
	render() {
		const dataSource = this.props.bookList
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

export default connect(mapStateToProps)(BookInfoTable)
