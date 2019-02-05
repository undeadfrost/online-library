import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BookTypesTable from './BookTypesTable'
import {fetchGetBookTypes} from '../../../api/index'
import {updateBookTypes} from '../../../redux/actions/book.actions'
import BookTypesActionBar from '../../../components/ActionBar/book/BookTypesActionBar'
import BookTypesModal from './BookTypesModal'


const mapStateToProps = state => ({bookTypes: state.booksData.bookTypes})

const mapDispatchToProps = dispatch => bindActionCreators({updateBookTypes}, dispatch)

class BookTypes extends Component {
	state = {
		bookTypeId: '',
		modalVisible: false
	}
	
	async componentDidMount() {
		await this.getBookTypes()
	}
	
	getBookTypes = async (params) => {
		const bookTypesRes = await fetchGetBookTypes(params)
		this.props.updateBookTypes({bookTypes: bookTypesRes})
	}
	
	setModalVisible = (bookTypeId, visible) => {
		this.setState({bookTypeId: bookTypeId, modalVisible: visible})
	}
	
	render() {
		return (
			<Fragment>
				<BookTypesActionBar title={'新增图书种类'} getBookTypes={this.getBookTypes}/>
				<BookTypesTable setModalVisible={this.setModalVisible} getBookTypes={this.getBookTypes}/>
				{
					this.state.modalVisible && <BookTypesModal
						title={'配置种类'}
						setVisible={this.setModalVisible}
						bookTypeId={this.state.bookTypeId}
						visible={this.state.modalVisible}
						getBookType={this.getBookTypes}/>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookTypes)
