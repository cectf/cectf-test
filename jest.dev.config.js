module.exports = {
    globals: {
        "CECTF_URL": "http://localhost",
        "CECTF_SHOW_TEST_WINDOW": false,
        "CECTF_SHOW_DEVTOOLS": false
    },
    "modulePaths": [
      "<rootDir>/src/js"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/"
    ],
    verbose: true
};