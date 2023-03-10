const HtmlWebpackPlugin = require("html-webpack-plugin");

// ========== 插件 =========
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html"
});

// ========= 打包规则 =========
const moduleRule = {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        type: "asset/resource",
        parser: {
            dataUrlCondition: {
                maxSize: 16
            }
        },
        generator: {
            filename: "res/[name][ext]",
            publicPath: "./res"
        },
    }, {
        test: /\.jsx?$/,
        use: "babel-loader",
    }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }]
}

module.exports={
    mode: "development",
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash].js",
        path: `${__dirname}/dist`,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true
	},
    module: moduleRule,
    plugins: [htmlPlugin],
}