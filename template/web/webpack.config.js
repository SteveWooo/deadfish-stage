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
    }]
}

module.exports={
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: `${__dirname}/dist`
    },
    module: moduleRule,
    plugins: [htmlPlugin]
}