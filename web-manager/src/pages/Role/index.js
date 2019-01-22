import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateRoles} from '../../redux/actions/role.actions'
import {fetchGetRole} from '../../api/index'
import RoleActionBar from '../../components/ActionBar/RoleActionBar'
import RoleTable from './RoleTable'
import MenuModal from './MenuModal'

const mapStateToProps = state => ({
	rolesData: state.rolesData
})

const mapDispatchToProps = dispatch => bindActionCreators({
	updateRoles
}, dispatch)

class Role extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roleModalVisible: false,
			roleModalTitle: '',
			roleId: ''
		}
	}
	
	setRoles = async (params) => {
		let response = await fetchGetRole(params)
		let rolesData = response.filter(item => (item.key = item.id))
		this.props.updateRoles(rolesData)
	}
	
	setRoleModalData = (roleModalVisible, roleModalTitle, roleId) => {
		this.setState({
			roleModalVisible: roleModalVisible,
			roleModalTitle: roleModalTitle,
			roleId: roleId
		})
	}
	
	setRoleModalVisible = (visible) => {
		this.setState({roleModalVisible: visible})
	}
	
	render() {
		return (
			<Fragment>
				<RoleActionBar title={'添加角色'} setRoles={this.setRoles}/>
				<RoleTable setRoleModalData={this.setRoleModalData}/>
				<MenuModal
					roleId={this.state.roleId}
					visible={this.state.roleModalVisible}
					setVisible={this.setRoleModalVisible}
					title={this.state.roleModalTitle}/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
