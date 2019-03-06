let map = {}

map.user = {
	input: [
		{
			id: 'realName',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your realName!',
					},
				],
			},
			formItemParams: {
				label: '真实姓名',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
			props: {
				type: 'text',
				placeholder: '真实姓名',
			}
		},
		{
			id: 'idCard',
			options: {
				rules: [
					{
						required: true,
						pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
						message: 'Please input your idCard!',
					},
				],
			},
			formItemParams: {
				label: '身份证',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
			props: {
				type: 'text',
				placeholder: '身份证',
			}
		},
		{
			id: 'password',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your password!',
					},
				],
			},
			formItemParams: {
				label: '密码',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
			props: {
				type: 'password',
				placeholder: '密码',
			}
		},
		{
			id: 'confirm',
			options: {
				rules: [
					{
						required: true,
						message: 'Please confirm your password!',
					},
				],
			},
			formItemParams: {
				label: '确认密码',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
			props: {
				type: 'password',
				placeholder: '确认密码',
			}
		},
		{
			id: 'mobile',
			options: {
				rules: [
					{
						required: true,
						pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						message: 'Please enter the correct mobile phone number！'
					},
				],
			},
			formItemParams: {
				label: '手机号',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
			props: {
				type: 'tel',
				placeholder: '手机号',
			}
		},
	],
}

export default map
