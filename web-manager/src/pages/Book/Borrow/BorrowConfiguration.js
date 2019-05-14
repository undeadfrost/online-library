import React, {Component} from 'react'
import {fetchGetBookBorrowInfo} from '../../../api/index'
import {Button} from 'antd'
import styles from './index.module.less'
import moment from 'moment'

class BorrowConfiguration extends Component {
	state = {
		borrowInfo: {},
		user: {},
		book: {}
	}
	
	componentDidMount() {
		const {params} = this.props.match
		fetchGetBookBorrowInfo({borrowId: params.id}).then(res => {
			const {user_reader: user, book, ...borrowInfo} = res
			this.setState({
				borrowInfo, user, book
			})
		})
	}
	
	render() {
		const {borrowInfo, user, book} = this.state
		console.log(this.state)
		return (
			<div className={styles.configuration}>
				<div>
					<p>借阅时间：{moment(borrowInfo.borrow_time).format('YYYY-MM-DD HH:mm:ss')}</p>
				</div>
				<div className={styles.details}>
					<div>
						<h3>用户信息</h3>
						<p>借阅人：{user.realName}</p>
						<p>身份证：{user.idCard}</p>
						<p>手机号：{user.mobile}</p>
					</div>
					<div>
						<h3>图书信息</h3>
						<p>图书编号：{book.number}</p>
						<p>图书名称：{book.bname}</p>
						<p>作者：{book.author}</p>
						<p>出版社：{book.publishing}</p>
					</div>
				</div>
				<Button type="primary">还书</Button>
			</div>
		)
	}
}

export default BorrowConfiguration
