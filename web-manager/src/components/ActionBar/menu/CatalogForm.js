import React, {Component, Fragment} from 'react'
import InputItem from '../../Form/InputItem'
import Map from '../map'
import NumberItem from "../../Form/NumberItem";

class CatalogForm extends Component {
	render() {
		const form = this.props.form
		const ItemMap = Map.catalog
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

export default CatalogForm
