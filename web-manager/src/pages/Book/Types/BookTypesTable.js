import React, {Component} from 'react'
import {Table, Divider, Popconfirm, message} from 'antd'
import {connect} from 'react-redux'
import {fetchDelBookType} from '../../../api/index'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const mapStateToProps = state => ({bookTypes: state.booksData.bookTypes})

class BookTypesTable extends Component {
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
		}, {
			title: '种类名称',
			dataIndex: 'typeName',
		}, {
			title: '种类详情',
			dataIndex: 'detail',
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
		this.props.setModalVisible(record.id, true)
	}
	
	delConfirm = async (bookTypeId) => {
		const delBookTypeRes = await fetchDelBookType({bookTypeId})
		if (delBookTypeRes.code === 1) {
			message.error(delBookTypeRes['msg'])
		}
		await this.props.getBookTypes()
	}
	
	render() {
		const dataSource = this.props.bookTypes
		return (
			<Table
				rowKey="id"
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={dataSource}/>
		);
	}
}

export default connect(mapStateToProps)(BookTypesTable)
