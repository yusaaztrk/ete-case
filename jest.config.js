
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  "setupFiles": ["<rootDir>/jest/setup.js"],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)/),(?!(react-native|react-native-vector-icons)/)',
    
  
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': 'identity-obj-proxy',
    
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  
};
