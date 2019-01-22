let map = {}
map.basic = {
	input: [
		{
			id: 'username',
			options: {
				rules: [],
			},
			formItemParams: {
				label: '用户名',
			},
			props: {
				type: 'text',
				disabled: true,
				placeholder: '用户名',
			}
		},
		{
			id: 'mobile',
			options: {
				rules: [
					{
						pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						message: 'Please enter the correct mobile phone number！'
					},
				],
				getValueFromEvent: (event) => {
					return event.target.value.replace(/\D/g, '')
				},
			},
			formItemParams: {
				label: '手机号',
			},
			props: {
				type: 'tel',
				placeholder: '手机号',
			}
		},
	]
}

map.security = {
	input: [
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
			},
			props: {
				type: 'password',
				placeholder: '确认密码',
			}
		},
	],
}

export default map
