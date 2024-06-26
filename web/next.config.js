
const path = require('path');

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                and: [/\.(js|ts)x?$/],
            },
            use: ['@svgr/webpack', 'url-loader'],
        });

        return config;
    },
};