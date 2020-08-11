const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = ( webpackMode ) => {

    let builtConfig = {
        entry: {
            app: [ './src/index.tsx' ]
        },

        output: {
            path: path.join( __dirname, '/dist' ),
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash].js',
            publicPath: '/'
        },

        node: {
            __dirname: true
        },

        module: {
            rules: [
                {
                    test: /\.tsx?/,
                    use: {
                        loader: 'ts-loader',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html/,
                    use: 'html-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        {
                            loader: 'css-loader',
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|otf|woff)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ico)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'favicons/'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [ '.js', '.jsx', '.css', '.scss', '.ts', '.tsx', '.json', '.html' ],
            alias: {
                '@components': path.resolve(__dirname, 'src', 'components'),
                '@helper': path.resolve(__dirname, 'src', 'helper'),
                '@root': path.resolve(__dirname, 'src'),
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: `index.html`,
                title: 'Contacts',
                template: `./src/htmlTemplates/index.template.ejs`,
                chunks: [ 'app' ]
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
                chunkFilename: '[id].[chunkhash].css',
            }),
            new webpack.DefinePlugin({
                DEV: webpackMode === 'development'
            }),
        ],
        devServer: {
            open: true,
            historyApiFallback: true,
            port: 0815,
            host: '0.0.0.0',
            compress: true,
            disableHostCheck: true,
            https: true,
            contentBase: "./dist",
        },
    }

    return builtConfig
}

module.exports = ( env, argv ) => {
    const mode = argv.mode || 'production'
    return config( mode )
}