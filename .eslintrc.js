module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-shadow": [
      "error",
      {
        "allow": [
          "err",
          "error",
          "done",
          "response",
          "resp"
        ]
      }
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "import/no-named-default": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "no-console": "error",
    "eol-last": [
      "error",
      "always"
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never"
      }
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true
      }
    ],
    "max-len": [
      "error",
      200,
      {
        "ignoreComments": true
      }
    ],
    "react/prop-types": [
      2,
      {
        "skipUndeclared": true
      }
    ],
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
  },
};
