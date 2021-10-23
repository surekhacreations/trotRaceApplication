module.exports = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 13,
		"sourceType": "module"
	},
	"rules": {
		"semi": ["error", "always"],
		"semi-style": ["error", "last"],
		"quotes": ["error", "double"],
		"no-trailing-spaces": ["error", {
			"skipBlankLines": true
		}],
		"indent": ["warn", "tab"]
	}
};
