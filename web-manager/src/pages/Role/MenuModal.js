import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, message} from "antd"
import PageLoading from "../../components/Loading/PageLoading"
import Tree from "../../components/Tree"
import {fetchGetRoleInfo, fetchSaveRoleInfo} from '../../api/index'

const mapStateToProps = state => ({
	menusData: state.menusData
})

class MenuModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			confirmLoading: false,
			nodeList: [],
			defaultCheckedKeys: [],
			checkedKeys: ''
		}
	}
	
	handleTreeCheckedKeys = (checkedKeys) => {
		this.setState({checkedKeys: checkedKeys})
	}
	
	handleOk = async () => {
		this.setState({confirmLoading: true})
		let params = {
			roleId: this.props.roleId,
			menuIds: this.state.checkedKeys
		}
		let saveRoleInfoRes = await fetchSaveRoleInfo(params)
		if (saveRoleInfoRes.code === 0) {
			message.success(saveRoleInfoRes['msg'])
			this.props.setVisible(false)
			this.setState({isLoading: true})
		} else {
			message.error(saveRoleInfoRes['msg'])
		}
		this.setState({confirmLoading: false})
	}
	
	handleCancel = () => {
		this.props.setVisible(false)
	}
	
	async componentDidUpdate(prevProps) {
		if (this.props.visible && !prevProps.visible) {
			this.setState({isLoading: true})
			const roleInfoRes = await fetchGetRoleInfo({roleId: this.props.roleId})
			let sysMenuAll = roleInfoRes['userMenuAll']
			let nodeList = sysMenuAll.filter(item => item.parent === 0)
			for (let i = 0; i < nodeList.length; i++) {
				nodeList[i].children = sysMenuAll.filter(item => (item.parent === nodeList[i].id))
			}
			this.setState({
				isLoading: false,
				defaultCheckedKeys: roleInfoRes['roleMenu'],
				nodeList: nodeList
			})
		}
	}
	
	render() {
		const isLoading = this.state.isLoading
		const title = this.props.title
		const visible = this.props.visible
		return (
			<Modal
				title={title}
				visible={visible}
				confirmLoading={this.state.confirmLoading}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				{isLoading
					? <PageLoading/>
					: <Tree
						nodeList={this.state.nodeList}
						defaultCheckedKeys={this.state.defaultCheckedKeys}
						onTreeCheckedKeys={this.handleTreeCheckedKeys}/>}
			</Modal>
		)
	}
}

export default connect(mapStateToProps)(MenuModal)
