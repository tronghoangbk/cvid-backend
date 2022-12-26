module.exports = {
    "env": {
        "es6": true,
        "node": true,
    },
    "parser": "@typescript-eslint/parser",
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier"
    ],
    "plugins": ["@typescript-eslint", "prettier"],

    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },

    "rules": {
        "max-len": ["warn", { "code": 120 }],
        "comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/semi": ["error"],
        "object-curly-spacing": ["error", "always"],
        "eol-last": ["error", "always"],
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "max-classes-per-file": "error",
        "prefer-template": "error",
        "prettier/prettier": 2,
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
};
