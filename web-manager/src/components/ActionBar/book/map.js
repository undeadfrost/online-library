let map = {}

map.bookTypes = {
	input: [
		{
			id: 'typeName',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your typeName!',
					},
				],
			},
			formItemParams: {
				label: '种类名称',
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
				placeholder: '种类名称',
			}
		},
		{
			id: 'detail',
			options: {
				rules: [],
			},
			formItemParams: {
				label: '种类详情',
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
				type: 'detail',
				placeholder: '种类详情',
			}
		},
	],
}

export default map
