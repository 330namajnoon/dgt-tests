module.exports = {
    apps: [
        {
            name: "tgt-tests",
            script: "./index.js",
			watch: false,
            env: {
                PORT: 5000,
            },
        },
    ],
};
