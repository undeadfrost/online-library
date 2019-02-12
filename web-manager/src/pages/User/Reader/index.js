import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReaderUserTable from './ReaderUserTable'
import {fetchGetReaderUsers} from '../../../api/index'
import {setReaderUserList} from '../../../redux/actions/user.actions'

const mapStateToProps = state => ({
	readerUserList: state.userData.readerUserList
})

const mapDispatchToProps = dispatch => bindActionCreators({setReaderUserList}, dispatch)

class UserReader extends Component {
	async componentDidMount() {
		await this.getReaderUser()
	}
	
	getReaderUser = async () => {
		const readerUsersRes = await fetchGetReaderUsers()
		this.props.setReaderUserList(readerUsersRes)
	}
	
	render() {
		return (
			<Fragment>
				<ReaderUserTable/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReader)
