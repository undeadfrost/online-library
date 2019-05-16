import React, {Component, Fragment} from 'react'
import HistoryTable from './HistoryTable'
import HistoryActionBar from '../../../components/ActionBar/history/HistoryActionBar'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchHistorys} from '../../../redux/actions/borrow.actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({fetchHistorys}, dispatch)

class BorrowHistory extends Component {
	componentDidMount() {
		this.props.fetchHistorys()
	}
	
	render() {
		return (
			<Fragment>
				<HistoryActionBar getBorrowHistorys={this.props.fetchHistorys}/>
				<HistoryTable getBorrowHistorys={this.props.fetchHistorys}/>
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistory)
