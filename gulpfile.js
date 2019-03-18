'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

gulp.task('compile', function() {
  return gulp.src('./packages/theme-chalk/src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./packages/theme-chalk/lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./packages/theme-chalk/src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./packages/theme-chalk/lib/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);