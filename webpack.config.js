const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        node: {
            fs: 'empty'
        },
        entry: {
            'style.css': path.join(__dirname, 'src', 'blocks', 'blocks.scss'),
            'script.js': path.join(__dirname, 'src', 'blocks', 'script.js'),
        },
        output: {
            filename: "[name]",
            path: path.resolve(__dirname, "build"),
        },
        watch: isDev,
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name]",
            }),
        ],
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: [
                        'babel-loader',
                    ],
                    exclude: '/node_modules/'
                },
                {
                    test: /\.s?css$/,
                    use: [
                        !isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(svg|png|jpg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ]
        }
    }
};
