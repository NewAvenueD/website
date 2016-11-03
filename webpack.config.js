module.exports = {
     entry: './themes/newave/src/js/scripts.js',
     output: {
         path: __dirname + '/themes/newave/public',
         filename: 'scripts.js',
     },
     devtool: 'source-map',
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }
