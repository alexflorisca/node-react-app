module.exports = {
    entry: "./app/js/app.jsx",
    output: {
        path: 'public/js',
        filename: "build.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', 'jsx', '.json']
    }
};