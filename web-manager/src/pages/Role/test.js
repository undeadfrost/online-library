import React, {Component, Fragment} from 'react'
import {Table, Divider, Modal} from 'antd'
import {connect} from 'react-redux'
import {fetchGetRole} from '../../api/index'
import ActionBar from '../../components/Table/ActionBar'
import Tree from '../../components/Tree/index'
import {fetchDelRole, fetchSaveRoleResources, fetchGetRoleResources} from '../../api/index'
import PageLoading from '../../components/Loading/PageLoading'

import RoleTable from './RoleTable'

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

const mapStateToProps = state => ({
	menusData: state.menusData
})

class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roleData: [],
			treeCheckedKeys: [],
			record: {},
			defaultCheckedKeys: [],
			isLoading: true,
			columns: [{
				title: 'ID',
				dataIndex: 'id',
			}, {
				title: '角色名称',
				dataIndex: 'roleName',
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (<span>
					<a onClick={() => {
						this.showModal(record)
					}}>配置</a>
					<Divider type="vertical"/>
					<a onClick={() => {
						this.onDeleteRole(record.id)
					}}>删除</a>
					</span>)
			}]
		}
		
	}
	
	showModal = async (record) => {
		this.setState({
			visible: true,
		});
		const res = await fetchGetRoleResources({roleId: record.id, type: 2})
		this.setState({
			record: record,
			isLoading: false,
			defaultCheckedKeys: res.resources
		})
	}
	
	handleOk = (e) => {
		let params = {
			roleId: this.state.record.id,
			resourceIds: this.state.treeCheckedKeys
		}
		fetchSaveRoleResources(params).then(res => {
			this.setState({
				visible: false,
			});
		})
	}
	
	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
		setTimeout(() => {
			this.setState({isLoading: true})
		})
	}
	
	handleTreeCheckedKeys = (treeCheckedKeys) => {
		this.setState({treeCheckedKeys: treeCheckedKeys})
	}
	
	onDeleteRole = async (roleIds) => {
		await fetchDelRole({roleIds: roleIds})
		await this.getRoleList()
	}
	
	async componentDidMount() {
		await this.getRoleList()
	}
	
	getRoleList = async (params) => {
		let response = await fetchGetRole(params)
		let roleData = response.filter(item => (item.key = item.id))
		this.setState({roleData: roleData})
	}
	
	render() {
		const isLoading = this.state.isLoading
		return (
			<Fragment>
				<ActionBar getRoleList={this.getRoleList}/>
				<Table
					rowSelection={rowSelection}
					columns={this.state.columns}
					dataSource={this.state.roleData}/>
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{isLoading
						? <PageLoading/>
						: <Tree
							menusData={this.props.menusData}
							defaultCheckedKeys={this.state.defaultCheckedKeys}
							onTreeCheckedKeys={this.handleTreeCheckedKeys}/>}
				</Modal>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps)(Test)
