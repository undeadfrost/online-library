import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import UserBasic from '../../../components/Personal/UserBasic'
import UserSecurity from '../../../components/Personal/UserSecurity'

class PersonalContent extends Component {
	render() {
		return (
			<Switch>
				<Route path='/admin/personal/basic' exact component={UserBasic}/>
				<Route path='/admin/personal/security' exact component={UserSecurity}/>
			</Switch>
		)
	}
}

export default PersonalContent
