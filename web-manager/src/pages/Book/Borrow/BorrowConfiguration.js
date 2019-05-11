import React, {Component} from 'react'

class BorrowConfiguration extends Component {
	render() {
		return (
			<div>{this.props.match.params.id}</div>
		)
	}
}

export default BorrowConfiguration
