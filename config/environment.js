/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="../node_modules/@types/ember/index.d.ts" />
/* jshint node: true */
module.exports = (environment) => {
    let ENV = {
        modulePrefix: 'play-pause',
        environment: environment,
        rootURL: null,
        locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
        EmberENV: {
            FEATURES: {}
        },
        APP: {}
    };
    if (environment === 'development') {
    }
    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';
        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;
        ENV.APP.rootElement = '#ember-testing';
    }
    if (environment === 'production') {
    }
    return ENV;
};
