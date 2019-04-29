import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BorrowActionBar from '../../../components/ActionBar/borrow/BorrowActionBar'
import { fetchGetBookBorrows } from '../../../api/index'
import { updateBorrows } from '../../../redux/actions/borrow.actions'
import BorrowTable from './BorrowTable'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({ updateBorrows }, dispatch)

class BookBorrow extends Component {
	getBookBorrows = (params) => {
		fetchGetBookBorrows(params).then(res => {
			this.props.updateBorrows({borrowList: res})
		})
	}

	componentDidMount() {
		this.getBookBorrows()
	}

	render() {
		return (
			<Fragment>
				<BorrowActionBar title={"图书借阅"} getBookBorrows={this.getBookBorrows} />
				<BorrowTable />
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookBorrow)
