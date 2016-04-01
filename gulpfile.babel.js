'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';

const scss = './themes/newave/src/scss/**/*.scss';

gulp.task('sass', () => {
  gulp.src(scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('./themes/newave/public'));
});

gulp.task('default', ['sass'], () => {
  gulp.watch(scss, ['sass']);
});
