var nodeExternals = require('webpack-node-externals');
var path = require("path");

module.exports = {
    output: {
        path: path.join(__dirname, "dist"),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'core',
        filename: "core.min.js" // no hash in main.js because index.html is a static page
    },
    devtool: "source-map",
    entry: "./src/index.ts",
    target: 'node',
    resolve: {
        extensions: ["", ".webpack.js", ".ts"]
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/, loader: "awesome-typescript-loader", query: {
                configFileName: './src/tsconfig.json'
            }
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    externals: [nodeExternals()]
};