'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import bSync from 'browser-sync'
import php from 'gulp-connect-php'

let browserSync = bSync.create();
const scss = './themes/newave/src/scss/**/*.scss';
const pages = './pages/**/*.md'


gulp.task('serve', ['sass'], () => {
  browserSync.init({
    proxy:'127.0.0.1:8010',
    port: 8080,
    open: true,
    notify: false
  });

  gulp.watch(scss, ['sass']);
  gulp.watch(pages).on('change', browserSync.reload)
})
// Server
gulp.task('php', function() {
    php.server({ base: '../.', port: 8010, keepalive: true});
});




gulp.task('sass', () => {
  gulp.src(scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('./themes/newave/public'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
