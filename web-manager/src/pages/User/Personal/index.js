import React, {Component} from 'react'
import {Layout} from 'antd'
import LeftNav from "../../../components/Personal/LeftNav"
import PersonalContent from './PersonalContent'
import styles from './index.module.less'

const {Sider, Content} = Layout

class Personal extends Component {
	render() {
		return (
			<Layout className={styles.layout}>
				<Sider className={styles.sider}><LeftNav/></Sider>
				<Layout>
					<Content className={styles.content}>
						<PersonalContent/>
					</Content>
				</Layout>
			</Layout>
		
		)
	}
}

export default Personal
