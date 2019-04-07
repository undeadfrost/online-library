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
		modalVisible: false,
		userId: ''
	}
	
	async componentDidMount() {
		await this.getReaderUsers()
	}
	
	getReaderUsers = async (params) => {
		const readerUsersRes = await fetchGetReaderUsers(params)
		this.props.setReaderUserList(readerUsersRes)
	}
	
	setModalVisible = (visible, userId) => {
		this.setState({modalVisible: visible, userId: userId})
	}
	
	render() {
		return (
			<Fragment>
				<ReaderUserActionBar
					title={'新增用户'}
					getReaderUsers={this.getReaderUsers}/>
				<ReaderUserTable
					getReaderUsers={this.getReaderUsers}
					setModalVisible={this.setModalVisible}/>
				{
					this.state.modalVisible && <ReaderUserModal
						title={'配置用户'}
						visible={this.state.modalVisible}
						userId={this.state.userId}
						setModalVisible={this.setModalVisible}
						getReaderUsers={this.getReaderUsers}/>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReader)
