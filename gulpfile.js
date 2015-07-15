var path        = require('path')
  , gulp        = require('gulp')
  , del         = require('del')
  , concat      = require('gulp-concat')
  , uglify      = require('gulp-uglify')
  , ngHtml2Js   = require("gulp-ng-html2js")
  , minifyHtml  = require("gulp-minify-html")
  , minifycss   = require("gulp-minify-css");

gulp.task('html2js', function () {
  gulp.src([ './src/*.html' ])
  .pipe(minifyHtml())
  .pipe(ngHtml2Js({
    moduleName: "ionic-datepicker.templates"
  }))
  .pipe(concat("templates.js"))
  // .pipe(uglify())
  .pipe(gulp.dest("./dist"));
});

gulp.task('build', [ 'html2js', 'cssminify' ], function () {
  gulp.src(['./src/*.js'])
  // .pipe(uglify())
  .pipe(concat("ionic-datepicker.js"))
  .pipe(gulp.dest("./dist"));
});

gulp.task('cssminify', function () {
  return gulp.src('./src/*.css')
  .pipe(minifycss())
  .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  del([ 'dist/*' ]);
});

gulp.task('watch', function() {
  gulp.watch([ './src/*.js', './src/template.html' ], [ 'build' ]);
});

gulp.task('default', [ 'clean', 'build' ]);
