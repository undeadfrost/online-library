import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import MenuTable from './MenuTable'
import MenuActionBar from '../../components/ActionBar/MenuActionBar'
import MenuModal from './MenuModal'
import {fetchGetMenu} from '../../api/index'
import {updateMenu} from '../../redux/actions/menu.actions'
import {formatRoutes} from '../../common/utils'

const mapStateToProps = state => ({menusList: state.menusData.menusList})

const mapDispatchToProps = dispatch => bindActionCreators({updateMenu}, dispatch)

class Route extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuId: '',
			menuModalVisible: false
		}
	}
	
	getMenus = async () => {
		let menusRes = await fetchGetMenu()
		this.props.updateMenu({menusList: formatRoutes(menusRes)})
	}
	
	setMenuModalData = (menuId, menuModalVisible) => {
		this.setState({
			menuId: menuId,
			menuModalVisible: menuModalVisible
		})
	}
	
	async componentDidMount() {
		await this.getMenus()
	}
	
	render() {
		return (
			<Fragment>
				<MenuActionBar title={'新增菜单'} getMenus={this.getMenus}/>
				<MenuTable setMenuModalData={this.setMenuModalData}/>
				{
					this.state.menuModalVisible && <MenuModal
						title={'配置菜单'}
						setVisible={this.setMenuModalData}
						menuId={this.state.menuId}
						visible={this.state.menuModalVisible}
						getMenus={this.getMenus}/>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Route)
