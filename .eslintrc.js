// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:prettier/recommended",
//     "plugin:@typescript-eslint/recommended",
//   ],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["react", "prettier", "@typescript-eslint"],
//   rules: {
//     "prettier/prettier": [
//       "error",
//       {
//         endOfLine: "auto",
//       },
//     ],
//     semi: ["error", "always"],
//     quotes: ["error", "double"],
//     "arrow-body-style": "off",
//     "prefer-arrow-callback": "off",
//   },
// };

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    indent: ["error", 4],
    eqeqeq: 0,
    camelcase: ["error", { properties: "never" }],
  },
};
