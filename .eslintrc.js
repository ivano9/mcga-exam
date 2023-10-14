module.exports = {
  "ignorePatterns": ["api/config/logger.js"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "quotes": ["error", "single"],
    "no-alert": ["error"],
    "no-else-return": ["error"],
    "arrow-body-style": ["error", "as-needed"]
  },
  "globals": {
    "__dirname": "readonly",
    "process": "readonly"
  }
}
