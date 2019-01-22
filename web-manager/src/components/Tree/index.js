import React, {Component} from 'react'
import {Tree} from 'antd'

const TreeNode = Tree.TreeNode

class Trees extends Component {
	onCheck = (checkedKeys, info) => {
		this.props.onTreeCheckedKeys([...info.halfCheckedKeys, ...checkedKeys])
	}
	
	renderTreeNodes = (data) => {
		return data.map(item => {
			if (item.children) {
				return (
					<TreeNode title={item.name} key={item.id}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				)
			} else {
				return (<TreeNode title={item.name} key={item.id}/>)
			}
		})
	}
	
	render() {
		const nodeList = this.props.nodeList
		return (
			<Tree
				checkable={true}
				onCheck={this.onCheck}
				defaultCheckedKeys={this.props.defaultCheckedKeys}
			>
				{this.renderTreeNodes(nodeList)}
			</Tree>
		)
	}
}

export default Trees
