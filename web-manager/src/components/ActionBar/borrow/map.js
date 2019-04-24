let map = {}

map.borrow = {
	input: [
		{
			id: 'number',
			options: {
				initialValue: "",
			},
			formItemParams: {
				label: '编号',
			},
			props: {
				type: 'text',
				placeholder: '编号',
			}
		},
		{
			id: 'bname',
			options: {
				initialValue: "",
			},
			formItemParams: {
				label: '书名',
			},
			props: {
				type: 'text',
				placeholder: '书名',
			}
		},
		{
			id: 'realName',
			options: {
				initialValue: "",
			},
			formItemParams: {
				label: '借阅人',
			},
			props: {
				type: 'text',
				placeholder: '借阅人',
			}
		},
		{
			id: 'keyword',
			options: {
				initialValue: "",
			},
			formItemParams: {
				label: '关键字',
			},
			props: {
				type: 'text',
				placeholder: '关键字',
			}
		},
	],
	form: [
		{
			id: 'number',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your number!',
					},
				],
				initialValue: "",
			},
			formItemParams: {
				label: '编号',
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
				placeholder: '编号',
			}
		},
		{
			id: 'idCard',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your idCard!',
					},
				],
				initialValue: "",
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
	]
}

export default map
