import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReaderUserTable from './ReaderUserTable'
import {fetchGetReaderUsers} from '../../../api/index'
import {setReaderUserList} from '../../../redux/actions/user.actions'
import ReaderUserActionBar from '../../../components/ActionBar/reader/ReaderUserActionBar'
import ReaderUserModal from './ReaderUserModal'

const mapStateToProps = state => ({
	readerUserList: state.userData.readerUserList
})

const mapDispatchToProps = dispatch => bindActionCreators({setReaderUserList}, dispatch)

class UserReader extends Component {
	state = {
		modalVisible: false
	}
	
	async componentDidMount() {
		await this.getReaderUsers()
	}
	
	getReaderUsers = async (params) => {
		const readerUsersRes = await fetchGetReaderUsers(params)
		this.props.setReaderUserList(readerUsersRes)
	}
	
	setModalVisible = (visible) => {
		this.setState({modalVisible: visible})
	}
	
	render() {
		return (
			<Fragment>
				<ReaderUserActionBar
					title={'新增用户'}
					getReaderUsers={this.getReaderUsers}/>
				<ReaderUserTable
					getReaderUsers={this.getReaderUsers}/>
				<ReaderUserModal
					title={'配置用户'}
					visible={this.state.modalVisible}
					setModalVisible={this.setModalVisible}/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReader)
