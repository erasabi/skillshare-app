// .eslintrc.js: eslint config file

module.exports = {
	// tells ESLint that we’re working in the browser environment
	//  Otherwise, it will incorrectly warn us that global variables like document are not defined.
	env: {
		browser: true,
		node: true, // recognize nodejs content
		es6: true
	},
	// specify absolute paths
	// absolute paths must be specified in these config files (if used):
	// 	1 webpack.config.js: so relative pathing isn't the only option when importing
	// 	2 jsconfig.json: so IDE will not show error on valid paths
	// 	3 eslintrc.js: so IDE will not show error when importing form index.js
	settings: {
		'import/resolver': {
			node: {
				paths: ['src']
			}
		},
		react: {
			version: 'detect'
		}
	},
	// tells ESLint that we’re using the following plugins
	plugins: ['react', 'better-styled-components'],
	rules: {
		'better-styled-components/sort-declarations-alphabetically': 2
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	// tells ESLint that we’re using the following parser
	parser: '@babel/eslint-parser'
}
