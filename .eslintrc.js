module.exports = {
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "./tsconfig.json"
	},
	"extends": ["standard", "plugin:@typescript-eslint/recommended"],
	"plugins": ["@typescript-eslint"],
	"rules": {
		"@typescript-eslint/explicit-function-return-type": ["off"],
		"@typescript-eslint/indent": ["error", 2],
		"@typescript-eslint/interface-name-prefix": ["error", "always"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"@typescript-eslint/prefer-interface": 0,
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/restrict-plus-operands": [0],
		"@typescript-eslint/camelcase": [0],
		"@typescript-eslint/ban-ts-ignore": ["off"],
		"@typescript-eslint/no-empty-function": ["off"],
		"no-prototype-builtins": ["off"],
		"no-dupe-class-members": ["off"],
		"space-before-function-paren": 0,
		"semi": ["error", "always"],
		"no-script-url": 0,
		"quotes": ["error", "double"],
		"import/no-duplicates": [0]
	}
}