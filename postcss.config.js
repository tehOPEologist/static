module.exports = () => {
    const browsers = [
        'last 2 versions',
        'not ie 10'
    ];

    return {
        plugins: {
            'postcss-cssnext': {
                browsers
            },
            'postcss-normalize': {
                browsers
            }
        }
    }
};
