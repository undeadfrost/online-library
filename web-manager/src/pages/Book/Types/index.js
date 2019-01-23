import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BookTypesTable from './BookTypesTable'
import {fetchGetBookTypes} from '../../../api/index'
import {updateBookTypes} from '../../../redux/actions/book.actions'


const mapStateToProps = state => ({bookTypes: state.booksData.bookTypes})

const mapDispatchToProps = dispatch => bindActionCreators({updateBookTypes}, dispatch)

class BookTypes extends Component {
	async componentDidMount() {
		const bookTypesRes = await fetchGetBookTypes()
		this.props.updateBookTypes({bookTypes: bookTypesRes})
	}
	
	render() {
		return (
			<div>
				<BookTypesTable/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTypes)
