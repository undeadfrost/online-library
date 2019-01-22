import React, {Component, Fragment} from 'react'
import {fetchGetUserList} from '../../api/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateUser} from '../../redux/actions/user.actions'
import UserTable from './UserTable'
import UserModal from './UserModal'
import UserActionBar from '../../components/ActionBar/UserActionBar'

const mapStateToProps = state => ({
    userList: state.userData.userList
})

const mapDispatchToProps = dispatch => bindActionCreators({updateUser}, dispatch)

class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userModalVisible: false,
            userModalTitle: '',
            userId: ''
        }
    }

    async componentDidMount() {
        await this.setUsers()
    }

    setUsers = async (params) => {
        let userListRes = await fetchGetUserList(params)
        let userList = userListRes.filter(item => (item.key = item.id))
        this.props.updateUser({userList: userList})
    }

    setUserModalData = (userModalVisible, userModalTitle, userId) => {
        this.setState({
            userModalVisible: userModalVisible,
            userModalTitle: userModalTitle,
            userId: userId
        })
    }

    setUserModalVisible = (visible) => {
        this.setState({userModalVisible: visible})
    }

    render() {
        return (
            <Fragment>
                <UserActionBar setUsers={this.setUsers} title={'新增用户'}/>
                <UserTable setUserModalData={this.setUserModalData} setUsers={this.setUsers}/>
                {
                    this.state.userModalVisible && <UserModal
                        setUsers={this.setUsers}
                        userId={this.state.userId}
                        visible={this.state.userModalVisible}
                        title={this.state.userModalTitle}
                        setVisible={this.setUserModalVisible}/>
                }
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
