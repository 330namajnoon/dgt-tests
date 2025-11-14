module.exports = {
    apps: [
        {
            name: "tgt-tests",
            script: "./index.js",
			watch: true,
            env: {
                PORT: 3000,
            },
        },
    ],
};
