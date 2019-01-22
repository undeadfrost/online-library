import React, {Component, Fragment} from 'react'
import InputItem from '../Form/InputItem'
import ItemMap from './map'

class LoginItem extends Component {
	
	render() {
		const form = this.props.form
		return (
			<Fragment>
				{
					ItemMap.map((item) => (
						<InputItem
							key={item.id}
							id={item.id}
							options={item.options}
							form={form}
							{...item.props}/>
					))
				}
			</Fragment>
		)
	}
}

export default LoginItem
