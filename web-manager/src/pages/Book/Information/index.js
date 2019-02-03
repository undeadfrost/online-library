import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateBookList} from '../../../redux/actions/book.actions'
import {fetchGetBooks, fetchGetBookTypes} from '../../../api/index'
import BookInfoTable from './BookInfoTable'
import BookActionBar from '../../../components/ActionBar/book/BookActionBar'
import BookInfoModal from './BookInfoModal'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({updateBookList}, dispatch)

class Information extends Component {
	state = {
		bookTypes: [],
		bookId: '',
		modalVisible: false
	}
	
	async componentDidMount() {
		await Promise.all([this.getBookList(), this.getTypes()])
	}
	
	getBookList = async (params) => {
		const booksRes = await fetchGetBooks(params)
		this.props.updateBookList({bookList: booksRes})
	}
	
	getTypes = async () => {
		let bookTypes = await fetchGetBookTypes()
		bookTypes = bookTypes.filter(item => item.data = item.typeName)
		this.setState({bookTypes: bookTypes})
	}
	
	setModalVisible = (bookId, visible) => {
		this.setState({bookId: bookId, modalVisible: visible})
	}
	
	render() {
		return (
			<Fragment>
				<BookActionBar
					title={'新增图书'}
					bookTypes={this.state.bookTypes}
					getBooks={this.getBookList}/>
				<BookInfoTable
					getBookList={this.getBookList}
					setModalVisible={this.setModalVisible}/>
				{
					this.state.modalVisible && <BookInfoModal
						title={'配置图书'}
						setVisible={this.setModalVisible}
						visible={this.state.modalVisible}
						bookId={this.state.bookId}
						bookTypes={this.state.bookTypes}/>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Information)
