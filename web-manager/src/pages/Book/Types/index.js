import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BookTypesTable from './BookTypesTable'
import {fetchGetBookTypes} from '../../../api/index'
import {updateBookTypes} from '../../../redux/actions/book.actions'
import BookTypesActionBar from '../../../components/ActionBar/book/BookTypesActionBar'


const mapStateToProps = state => ({bookTypes: state.booksData.bookTypes})

const mapDispatchToProps = dispatch => bindActionCreators({updateBookTypes}, dispatch)

class BookTypes extends Component {
	async componentDidMount() {
		await this.getBookTypes()
	}
	
	getBookTypes = async (params) => {
		const bookTypesRes = await fetchGetBookTypes(params)
		this.props.updateBookTypes({bookTypes: bookTypesRes})
	}
	
	render() {
		return (
			<Fragment>
				<BookTypesActionBar title={'新增图书种类'} getBookTypes={this.getBookTypes}/>
				<BookTypesTable/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTypes)
