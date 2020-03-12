var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            authApiUrl: 'http://localhost:8082',
            gameApiUrl: 'http://localhost:8083/games',
            userApiUrl: 'http://localhost:8084/users',
            groupApiUrl: 'http://localhost:8085/groups'

        })
    }
}
