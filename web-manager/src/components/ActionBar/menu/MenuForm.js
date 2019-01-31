import React, {Component, Fragment} from 'react'
import InputItem from '../../Form/InputItem'
import Map from '../map'
import NumberItem from "../../Form/NumberItem"
import SelectItem from '../../Form/SelectItem'

class MenuForm extends Component {
	render() {
		const form = this.props.form
		const ItemMap = Map.menu
		return (
			<Fragment>
				{
					ItemMap.input.map(item => (
						<InputItem
							key={item.id}
							id={item.id}
							options={item.options}
							formItemParams={item.formItemParams}
							form={form}
							{...item.props}/>
					))
				}
				{
					ItemMap.select.map(item => (
						<SelectItem
							key={item.id}
							id={item.id}
							options={item.options}
							form={form}
							formItemParams={item.formItemParams}
							selectData={this.props.selectData}/>
					))
				}
				{
					<NumberItem
						key={ItemMap.number.id}
						id={ItemMap.number.id}
						options={ItemMap.number.options}
						formItemParams={ItemMap.number.formItemParams}
						form={form}
						{...ItemMap.number.props}/>
				}
			</Fragment>
		)
	}
}

export default MenuForm
