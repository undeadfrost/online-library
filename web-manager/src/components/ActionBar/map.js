let map = {}
map.role = [
	{
		id: 'roleName',
		options: {
			rules: [
				{
					required: true,
					message: 'Please enter roleName!',
				},
			],
		},
		formItemParams: {
			label: '角色名'
		},
		props: {
			type: 'text',
			placeholder: '请输入角色名',
		}
	},
	{
		id: 'remark',
		options: {
			rules: [
				{
					message: 'Please enter remark!',
				},
			],
		},
		formItemParams: {
			label: '备注'
		},
		props: {
			type: 'text',
			placeholder: '请输入备注',
		}
	},
]

map.user = {
	input: [
		{
			id: 'username',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your username!',
					},
				],
			},
			formItemParams: {
				label: '用户名',
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
				placeholder: '用户名',
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
	switch: [
		{
			id: 'status',
			options: {
				valuePropName: 'checked',
				initialValue: false
			},
			formItemParams: {
				label: '状态',
				labelCol: {span: 4},
				wrapperCol: {span: 14},
			},
			props: {
				checkedChildren: '启用',
				unCheckedChildren: '禁用'
			}
		},
	],
	select: {
		id: 'roles',
		options: {
			rules: [
				{
					required: true,
					message: 'Please select your roleName!',
				},
			],
		},
		formItemParams: {
			label: '角色',
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

map.menu = {
	input: [
		{
			id: 'routeName',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your menuName!',
					},
				],
			},
			formItemParams: {
				label: '菜单名称',
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
				placeholder: '菜单名称',
			}
		},
		{
			id: 'menuRoute',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your menuRoute!',
					},
				],
			},
			formItemParams: {
				label: '菜单路由',
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
				placeholder: '菜单路由',
			}
		},
		{
			id: 'menuPermission',
			options: {
				rules: [],
			},
			formItemParams: {
				label: '权限标识',
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
				placeholder: '用多个逗号分隔，例如：sys:user:list,sys:user:save',
			}
		},
		{
			id: 'icon',
			options: {
				rules: [],
				initialValue: "file-text"
			},
			formItemParams: {
				label: '菜单图标',
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
				placeholder: '菜单图标',
			}
		},
	],
	select: [
		{
			id: 'parentMenu',
			options: {
				rules: [
					{
						required: true,
						message: 'Please select your parentMenu!',
					},
				],
				initialValue: {key: 0, label: '一级菜单'},
			},
			formItemParams: {
				label: '上级菜单',
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
	number: {
		id: 'orderNum',
		options: {
			rules: [
				{
					required: true,
					message: 'Please input your orderNum!',
				},
			],
			initialValue: 1,
		},
		formItemParams: {
			label: '排序号',
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

map.catalog = {
	input: [
		{
			id: 'routeName',
			options: {
				rules: [
					{
						required: true,
						message: 'Please input your catalogName!',
					},
				],
			},
			formItemParams: {
				label: '目录名称',
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
				placeholder: '目录名称',
			}
		},
		{
			id: 'icon',
			options: {
				rules: [],
				initialValue: "file-text"
			},
			formItemParams: {
				label: '目录图标',
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
				placeholder: '目录图标',
			}
		},
	],
	number: {
		id: 'orderNum',
		options: {
			rules: [
				{
					required: true,
					message: 'Please input your orderNumber!',
				},
			],
			initialValue: 1,
		},
		formItemParams: {
			label: '排序号',
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
