var path = require('path'),
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  ngHtml2Js = require("gulp-ng-html2js"),
  minifyHtml = require("gulp-minify-html"),
  minifycss = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),

  ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");


gulp.task('html2js', function (done) {
  gulp.src(['./src/*.html'])
    .pipe(minifyHtml())
    .pipe(ngHtml2Js({
      moduleName: "ionic-datepicker.templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./dist"))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest("./dist"))
    .on('end', done);
});

gulp.task('build', ['html2js', 'minify-css'], function (done) {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
   .pipe(tsProject(ts))

  tsResult
    .pipe(concat('datepicker.min.js')) // You can use other plugins that also support gulp-sourcemaps
   
    .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
    .pipe(gulp.dest('dist/'))
  .on('end', done);
});

gulp.task('minify-css', function (done) {
  gulp.src('./src/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});

gulp.task('clean', function () {
  del(['dist/*']);
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js', './src/template.html', './src/*.css'], ['build']);
});

gulp.task('default', ['clean', 'build']);