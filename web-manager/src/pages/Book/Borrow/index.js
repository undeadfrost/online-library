import React, {Component} from 'react'
import BorrowActionBar from '../../../components/ActionBar/borrow/BorrowActionBar'
import {fetchGetBookBorrows} from '../../../api/index'

class BookBorrow extends Component {
	getBookBorrows = (params) => {
		fetchGetBookBorrows(params).then(res => {
		
		})
	}
	
	render() {
		return (
			<div>
				<BorrowActionBar getBookBorrows={this.getBookBorrows}/>
			</div>
		)
	}
}

export default BookBorrow
