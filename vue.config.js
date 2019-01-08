// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    baseUrl: "/kjh", // 设置基本的URL
    // outputDir:  '' // 设置生产构建文件的目录
    assetsDir: "assets",
    // lintOnSave: true // 每次保存lint代码、
    // runtimeCompiler: false  // 组件中使用template
    // productionSourceMap: true // 生产环境source map
    configureWebpack: {
        devtool: "source-map"
    },
    // configureWebpack: config => {} // 配置webpack
    devServer: {
        port: 8084,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:4356",
                // target: "http://fin.kuaijihui.com/kjh_api",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    css: {
        // modules: false, // 将*.module.[ext]视为module
        extract: true, // 提取css为单独文件
        // sourceMap: false, // 关闭css source map
        loaderOptions: {
            sass: {
                javascriptEnabled: true
            }
        }
    }
};
