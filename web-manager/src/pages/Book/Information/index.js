import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateBookList} from '../../../redux/actions/book.actions'
import {fetchGetBooks} from '../../../api/index'
import BookInfoTable from './BookInfoTable'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({updateBookList}, dispatch)

class Information extends Component {
	async componentDidMount() {
		await this.getBookList()
	}
	
	getBookList = async (params) => {
		const booksRes = await fetchGetBooks(params)
		this.props.updateBookList({bookList: booksRes})
	}
	
	render() {
		return (
			<Fragment>
				<BookInfoTable getBookList={this.getBookList}/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Information)
