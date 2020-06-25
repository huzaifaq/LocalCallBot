module.exports = {
	apps: [
		{
			name: 'LocalCallBot',
			script: 'npm',
			args: 'run start',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
}
