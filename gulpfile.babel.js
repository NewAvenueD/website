'use strict'
// import Promise from 'es6-promise'
import gulp from 'gulp';
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import prefix from 'gulp-autoprefixer'
import bSync from 'browser-sync'
import php from 'gulp-connect-php'
import babel from 'gulp-babel'
import gutil from 'gulp-util'
import print from 'gulp-print'
import clean from 'gulp-clean'
import concat from 'gulp-concat'
import fs from 'fs'
import path from 'path'
let browserSync = bSync.create()
const scss = './themes/newave/src/scss/**/*.scss'
const js = './themes/newave/src/js/**/*.js'
const pages = './pages/**/*.md'
const templates = './themes/newave/templates/**/*.twig'
const pub = './themes/newave/public'

let env = gutil.env.env || 'development'
let info = ['environment is...', env, '__filename is...', __filename];
// triv



info.map( (item) => gutil.log(item));
// TODO: switch to gulp-watch so new files are watched too

gulp.task('clean', () => {
  return gulp.src('./themes/newave/public/*', {read: false})
    .pipe(print())
    .pipe(clean({force: true}))
})

gulp.task('build', ['clean', 'sass', 'js'], () => {
  gutil.log('running ', env, ' tasks........')
  gutil.log(__dirname + '/../system/router.php')
})

gulp.task('test', () => {
  let router = path.join(__dirname, '../system/', 'router.php')
  fs.readFile(router, 'utf8', (err, contents) => {
    console.log(contents);
  })
})

gulp.task('serve', ['sass', 'js'], () => {
  // headers required to make debugbar work
  browserSync.init({
    proxy: {
      target: '127.0.0.1:8080',
      reqHeaders: function() {
        return {
            host: 'localhost:8081'
        }
      }
    },
    port: 8080,
    open: true,
    notify: false,
  })

  gulp.watch(scss, ['sass'])
  gulp.watch(js, ['js'])
  gulp.watch([pages, js, scss, templates]).on('change', browserSync.reload)
})
// PHP Server

// BELOW NOT WORKING
//
// hack: run `php -S localhost:8080 system/router.php` from grav root, then gulp serve


// run this once before proxying with bS
// gulp.task('php', function() {
//
//   // let router = path.join(__dirname, '../system/', 'router.php')
//   // gutil.log(router)
//   //
//   // php.server({
//   //   base: '../.',
//   //   port: 8010,
//   //   keepalive: true,
//   //   router: __dirname + 'router.php'
//   // })
// })

gulp.task('sass', () => {
  if (env === 'production') {
    gulp.src(scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix())
      .pipe(gulp.dest(pub))

  } else {
    // no minify, add sourcemaps and pipe to BS stream
    gulp.src(scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pub))
    .pipe(browserSync.stream())
  }
})

gulp.task('js', () => {
  gutil.log('js task running..')
  gulp.src(js)
    .pipe(print())
    .pipe(webpack( webpackConfig ))
    .on('error', gutil.log)
    .pipe(gulp.dest(pub))
})

gulp.task('default', ['serve'])
