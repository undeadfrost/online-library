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

map.book = {
	input: [
		{
			id: 'number',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your number!',
					},
				],
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
			id: 'bname',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your bname!',
					},
				],
			},
			formItemParams: {
				label: '书名',
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
				placeholder: '书名',
			}
		},
		{
			id: 'author',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your author!',
					},
				],
			},
			formItemParams: {
				label: '作者',
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
				placeholder: '作者',
			}
		},
		{
			id: 'publishing',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your publishing!',
					},
				],
			},
			formItemParams: {
				label: '出版社',
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
				placeholder: '出版社',
			}
		},
	],
	number: {
		id: 'timeLimit',
		options: {
			rules: [
				{
					required: true,
					message: 'Please input your timeLimit!',
				},
			],
			initialValue: 7,
		},
		formItemParams: {
			label: '借阅期限',
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
			min: 1,
			max: 365,
			formatter: value => `${value}`.replace(/\^[0-9]*$/g, ''),
		}
	},
	select: [
		{
			id: 'book_type',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your bookType!',
					},
				],
			},
			formItemParams: {
				label: '图书分类',
				labelCol: {
					xs: {span: 24},
					sm: {span: 4},
				},
				wrapperCol: {
					xs: {span: 24},
					sm: {span: 18},
				},
			},
		},
	],
	upload: {
		id: 'cover',
		options: {
			valuePropName: 'fileList',
			getValueFromEvent: function (e) {
				if (Array.isArray(e)) {
					return e[e.length - 1]
				}
				return e && e['file']
			}
		},
		formItemParams: {
			label: '图书封面',
			labelCol: {
				xs: {span: 24},
				sm: {span: 4},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 18},
			},
		},
	}
}

export default map
