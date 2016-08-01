'use strict';
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import bSync from 'browser-sync';
import php from 'gulp-connect-php';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import print from 'gulp-print'

let browserSync = bSync.create();
const scss = './themes/newave/src/scss/**/*.scss';
const js = './themes/newave/src/js/**/*.js';
const pages = './pages/**/*.md';
const templates = './themes/newave/templates/**/*.twig';
const pub = './themes/newave/public';

let env = gutil.env.env || 'development';

// TODO: switch to gulp-watch so new files are watched too
gutil.log(__filename);

gulp.task('test', () => {
  gutil.log('gulp says the working directory is', __dirname)
})

gulp.task('serve', ['sass', 'php'], () => {
  // gutil.log(env);

  browserSync.init({
    proxy:'127.0.0.1:8010',
    port: 8080,
    open: true,
    notify: false
  });

  gulp.watch(scss, ['sass']);
  gulp.watch(js, ['js']);
  gulp.watch([pages, templates]).on('change', browserSync.reload)
});
// PHP Server
// run this once before proxying with bS
// run this once before proxying with bS
gulp.task('php', function() {
    php.server({ base: '../.', port: 8010, keepalive: true});
});

gulp.task('sass', () => {
  gulp.src(scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pub))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  gulp.src(js)
    .pipe(print())
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest(pub))
})

gulp.task('default', ['serve']);
