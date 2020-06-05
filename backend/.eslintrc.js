module.exports = {
  parser: "@typescript-eslint/parser", 
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: "module", 
    ecmaFeatures: {
      jsx: true 
    }
  },
  settings: {
    react: {
      version: "detect" 
    }
  },
  extends: [
    "plugin:react/recommended", 
    "plugin:@typescript-eslint/recommended", 
    "prettier/@typescript-eslint", 
    "plugin:prettier/recommended" 
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js', '.ts', '.tsx']
      }
    ],
    
    
  },
};
