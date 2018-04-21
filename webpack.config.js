const nodeExternals = require('webpack-node-externals');
const path = require("path");
const webpack = require('webpack');

module.exports = {
    output: {
        library: 'core', //indicating core can be depended by other codes
        filename: '[name].min.js',
        path: path.join(__dirname, "dist"),
        libraryTarget: 'umd',  // core will work with all the module definitions
        umdNamedDefine: true
    },
    entry: {core: "./src/index.ts"},//use object rather than string or array
    resolve: {
        extensions: [".ts"]
    },//Automatically resolve certain extensions
    target: 'node', //Compile for usage in a Node.js-like environment (uses Node.js require to load chunks)
    module: {
        rules: [
            {
                test: /\.ts$/,// Identify what files should be transformed by a certain loader
                loader: "awesome-typescript-loader",//all source are transformed by this loader
                exclude: /node_modules/,
                query: {
                    configFileName: './src/tsconfig.json'  //use this to point to tsconfig file
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    externals: [nodeExternals()],//in order to ignore all modules in node_modules folder
    devtool: "source-map",  //This option controls if and how Source Maps are generated.
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })  // a simple but effective way to optimize your web app
    ]
};