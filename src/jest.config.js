module.exports = {
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(jsx)$": "babel-jest"
      }
      
    setupFilesAfterEnv: ['./src/setupTests.js'],
    testEnvironment: 'jsdom',
  };
  