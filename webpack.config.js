const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

module.exports = env => {
    const prod = env === 'production';
    const stats = {
        children: false,
        excludeAssets: /\.map$/,
        modules: false,
        assetsSort: 'name'
    };

    return {
        context: __dirname,
        devServer: {
            historyApiFallback: true,
            hotOnly: true,
            https: true,
            inline: true,
            stats
        },
        devtool: prod ? false : 'source-map',
        entry: {
            client: resolve(__dirname, 'src')
        },
        mode: env,
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    include: /src/,
                    loader: 'babel-loader',
                    test: /\.js$/
                },
                {
                    exclude: /node_modules/,
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]',
                                sourceMap: prod ? false : true,
                                minimize: prod ? true : false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    postcssPresetEnv(),
                                    postcssNormalize()
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            runtimeChunk: true,
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        name: 'vendors',
                        test: /node_modules/
                    }
                }
            }
        },
        output: {
            chunkFilename: prod ? '[name].[chunkhash].js' : '[name].js',
            filename: prod ? '[name].[chunkhash].js' : '[name].js',
            path: resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        plugins: [
            new HtmlPlugin({
                template: resolve(__dirname, 'src', 'index.ejs'),
                minify: prod ? {
                    removeComments: true,
                    collapseWhitespace: true
                } : false
            })
        ].concat(
            prod ? [] : [
                new webpack.HotModuleReplacementPlugin()
            ]
        ),
        resolve: {
            extensions: ['.css', '.js']
        },
        stats,
        target: 'web'
    };
};
