module.exports = function(config) {
    config.set({

        // These are the files required to run the tests.
        files: [
            './../tests/test.bundle.js'
        ],

        preprocessors: {
            './../tests/test.bundle.js': ['webpack']
        },

        browsers: ['Chrome'],

        frameworks: ['mocha'],

        reporters: [ 'dots' ],

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            } 
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-webpack'
        ],

    })
};