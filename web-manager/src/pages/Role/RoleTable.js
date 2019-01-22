import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Divider, Table, Popconfirm, Icon, message} from 'antd'
import {fetchDelRole, fetchGetRole} from "../../api"
import {updateRoles} from '../../redux/actions/role.actions'

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
	rolesData: state.rolesData
})

const mapDispatchToProps = dispatch => bindActionCreators({
	updateRoles
}, dispatch)

const icon = <Icon type="question-circle-o" style={{color: 'red'}}/>

class RoleTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			rolesData: [],
			columns: [{
				title: 'ID',
				dataIndex: 'id',
			}, {
				title: '角色名称',
				dataIndex: 'roleName',
			}, {
				title: '备注',
				dataIndex: 'remark',
			}, {
				title: '操作',
				key: 'action',
				render: (text, record, index) => (<span>
					<a onClick={() => {
						this.roleRowConfiguration(record)
					}}>配置</a>
					<Divider type="vertical"/>
					<Popconfirm placement="topRight" title="是否删除该角色?" cancelText={'取消'} okText={'确定'}
											icon={icon} onConfirm={this.delConfirm.bind(this, record.id)}>
						<a href="#">删除</a>
					</Popconfirm>
				</span>)
			}]
		}
	}
	
	delConfirm = async (roleId) => {
		const delRolesRes = await fetchDelRole({roleIds: roleId})
		if (delRolesRes.code !== 0) {
			message.error(delRolesRes['msg'])
		}
		let rolesRes = await this.getRoleList()
		this.props.updateRoles(rolesRes)
	}
	
	getRoleList = async (params) => {
		let response = await fetchGetRole(params)
		let rolesData = response.filter(item => (item.key = item.id))
		return rolesData
	}
	
	roleRowConfiguration = (record) => {
		this.props.setRoleModalData(true, record.roleName, record.id)
	}
	
	async componentDidMount() {
		let rolesRes = await this.getRoleList()
		this.props.updateRoles(rolesRes)
	}
	
	render() {
		const rolesData = this.props.rolesData
		return (
			<Table
				bordered
				rowSelection={rowSelection}
				columns={this.state.columns}
				dataSource={rolesData}/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleTable)
