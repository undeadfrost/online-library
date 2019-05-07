import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BorrowActionBar from '../../../components/ActionBar/borrow/BorrowActionBar'
import {fetchGetBookBorrows} from '../../../api/index'
import {fetchBorrows} from '../../../redux/actions/borrow.actions'
import BorrowTable from './BorrowTable'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({fetchBorrows}, dispatch)

class BookBorrow extends Component {
	componentDidMount() {
		this.props.fetchBorrows()
	}
	
	render() {
		return (
			<Fragment>
				<BorrowActionBar title={"图书借阅"} getBookBorrows={this.props.fetchBorrows}/>
				<BorrowTable/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookBorrow)
