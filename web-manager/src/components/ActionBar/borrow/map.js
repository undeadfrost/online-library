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
}

export default map
