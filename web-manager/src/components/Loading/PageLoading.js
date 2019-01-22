import React, {Component} from 'react'
import {Spin} from 'antd'

class PageLoading extends Component {
	render() {
		return (
			<div style={{paddingTop: '15%', textAlign: 'center'}}>
				<Spin size='large'/>
			</div>
		)
	}
}

export default PageLoading
