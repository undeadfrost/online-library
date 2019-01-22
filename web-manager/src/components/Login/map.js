import React from 'react';
import {Icon} from 'antd';

export default [
	{
		id: 'username',
		options: {
			rules: [
				{
					required: true,
					message: 'Please enter username!',
				},
			],
		},
		props: {
			type: 'text',
			size: 'large',
			prefix: <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>,
			placeholder: 'username',
		}
	},
	{
		id: 'password',
		options: {
			rules: [
				{
					required: true,
					message: 'Please enter password!',
				},
			],
		},
		props: {
			size: 'large',
			prefix: <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>,
			type: 'password',
			placeholder: 'password',
		}
	}
]
