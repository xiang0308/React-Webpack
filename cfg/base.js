'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

let additionalPaths = [];
let REACT_WEBPACK_ENV = process.env.REACT_WEBPACK_ENV;
let envMap = {
    qa: 'test',
    rd: 'dev'
};

if (envMap[REACT_WEBPACK_ENV]) {
    REACT_WEBPACK_ENV = envMap[REACT_WEBPACK_ENV]
}

module.exports = {
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            actions: `${defaultSettings.srcPath}/actions/`,
            components: `${defaultSettings.srcPath}/components/`,
            public: `${defaultSettings.srcPath}/public/`,
            business: `${defaultSettings.srcPath}/business/`,
            sources: `${defaultSettings.srcPath}/sources/`,
            stores: `${defaultSettings.srcPath}/stores/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            images: `${defaultSettings.srcPath}/images/`,
            services: `${defaultSettings.srcPath}/services/`,
            config: `${defaultSettings.srcPath}/config/` + REACT_WEBPACK_ENV
        }
    },
    module: {}
};
