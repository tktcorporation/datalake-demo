module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "indent": ["error", 4],
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "google"],
};