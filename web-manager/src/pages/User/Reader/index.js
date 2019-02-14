import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReaderUserTable from './ReaderUserTable'
import {fetchGetReaderUsers} from '../../../api/index'
import {setReaderUserList} from '../../../redux/actions/user.actions'
import ReaderUserActionBar from '../../../components/ActionBar/reader/ReaderUserActionBar'

const mapStateToProps = state => ({
	readerUserList: state.userData.readerUserList
})

const mapDispatchToProps = dispatch => bindActionCreators({setReaderUserList}, dispatch)

class UserReader extends Component {
	async componentDidMount() {
		await this.getReaderUsers()
	}
	
	getReaderUsers = async () => {
		const readerUsersRes = await fetchGetReaderUsers()
		this.props.setReaderUserList(readerUsersRes)
	}
	
	render() {
		return (
			<Fragment>
				<ReaderUserActionBar title={'新增用户'} getReaderUsers={this.getReaderUsers}/>
				<ReaderUserTable getReaderUsers={this.getReaderUsers}/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReader)
