const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

let plugins = [];

plugins.push(new WebpackShellPlugin({
    onBuildStart: ['echo "Starting"'],
    onBuildEnd: ['cross-env NODE_ENV=dev ./node_modules/electron/dist/electron electron']
}));

let config = {
    entry : path.resolve(__dirname, "app/src/index.ts"),
    watch : true,
    output: {
        path: path.resolve(__dirname, "app/dist"),
        filename: "index.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],

                loader: "ts-loader"
            }
        ]
    }
};

module.exports = config;