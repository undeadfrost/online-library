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
				<BorrowActionBar title={"图书借阅"} getBookBorrows={this.getBookBorrows}/>
			</div>
		)
	}
}

export default BookBorrow
