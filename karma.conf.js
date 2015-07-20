module.exports = function(config) {
  config.set({
    basePath: '',

    // frameworks to use
    frameworks: ['mocha', 'chai'],

    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/ionic/js/ionic.js',
      './bower_components/ionic/js/ionic-angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './dist/**/*.js',
      'spec/**/*'
    ],
    exclude: [
    ],
    reporters: [ 'progress', 'coverage' ],
    port: 9876,
    runnerPort: 9100,

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: './src/*.html',
      prependPrefix: './dist/',
      moduleName: 'ionic-datepicker.templates'
    },

    coverageReporter: {
      dir: './dist/coverage/',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },

    preprocessors: {
      './src/*.html': [ 'ng-html2js' ],
      './dist/*.js': [ 'coverage' ]
    }
  });
};
