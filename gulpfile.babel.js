'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import browserSync from 'browser-sync'
import php from 'gulp-connect-php'

const reload = browserSync.reload;
const scss = './themes/newave/src/scss/**/*.scss';
const pages = './pages/**/*.md'

// Server
gulp.task('php', function() {
    php.server({ base: '../.', port: 8010, keepalive: true});
});


gulp.task('browser-sync', ['php'], () => {
  browserSync({
    proxy:'127.0.0.1:8010',
    port: 8080,
    open: true,
    notify: false
  })
})

gulp.task('sass', () => {
  gulp.src(scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('./themes/newave/public'));
});

gulp.task('default', ['browser-sync','sass'], () => {
  gulp.watch(scss, ['sass']);
  gulp.watch(pages, [reload]);
});
