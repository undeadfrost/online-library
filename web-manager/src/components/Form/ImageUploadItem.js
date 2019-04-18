import React, {Component} from 'react'
import {Form, Upload, Icon} from "antd"
import config from '../../config'

const FormItem = Form.Item

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

class ImageUploadItem extends Component {
	state = {
		imageUrl: '',
	}
	
	
	componentWillReceiveProps(nextProps) {
		// imageUrl自动设置
		const {id, form} = nextProps
		const {getFieldValue} = form
		if (!getFieldValue(id) && this.state.imageUrl != '') { // 表单中有数据，并且图片存在链接的情况内部更新图片链接
			this.setState({imageUrl: ''})
		} else if (getFieldValue(id) && this.state.imageUrl == '') { // 表单中有数据且图片不存在链接则获取表单中的链接
			this.setState({imageUrl: `${config.baseUrl}${getFieldValue(id)}`})
		}
	}
	
	beforeUpload = (file) => {
		getBase64(file, imageUrl => this.setState({
			imageUrl,
		}));
		return false
	}
	
	render() {
		const {id, options, form, formItemParams} = this.props
		const {getFieldDecorator} = form
		const uploadButton = (
			<div>
				<Icon type={'plus'}/>
				<div className="ant-upload-text">Upload</div>
			</div>
		)
		return (
			<FormItem {...formItemParams}>
				{getFieldDecorator(id, options)(
					<Upload
						listType="picture-card"
						showUploadList={false}
						beforeUpload={this.beforeUpload}>
						{this.state.imageUrl ? <img src={this.state.imageUrl} style={{width: 100}}/> : uploadButton}
					</Upload>)}
			</FormItem>
		)
	}
}

export default ImageUploadItem
