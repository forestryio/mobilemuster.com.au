'use strict'

import gulp from 'gulp'
import del from 'del'
import runSequence from 'run-sequence'
import gulpLoadPlugins from 'gulp-load-plugins'
import { spawn } from "child_process"
import tildeImporter from 'node-sass-tilde-importer'

import rollup from 'gulp-better-rollup'
import babel from 'rollup-plugin-babel'
import rollupResolve from 'rollup-plugin-node-resolve'
import rollupCommonJS from 'rollup-plugin-commonjs'

const $ = gulpLoadPlugins()
const browserSync = require('browser-sync').create()
const isProduction = process.env.NODE_ENV === 'production'

const onError = (err) => {
    console.log(err)
}

// --

gulp.task('server', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
    $.watch('src/sass/**/*.scss', () => gulp.start('sass'))
    $.watch('src/js/**/*.js', () => gulp.start('js-watch'))
    $.watch('src/images/**/*', () => gulp.start('images'))
    $.watch(['archetypes/**/*', 'data/**/*', 'content/**/*', 'layouts/**/*', 'static/**/*', 'config.toml'], () => gulp.start('hugo'))
});

gulp.task('build', () => {
    runSequence(['sass', 'js', 'fonts', 'images'], 'hugo')
})

gulp.task('build-preview', () => {
    runSequence(['sass', 'js', 'fonts', 'images'], 'hugo-preview')
})

gulp.task('hugo', (cb) => {
    return spawn('hugo', { stdio: 'inherit' }).on('close', (code) => {
        browserSync.reload()
        cb()
    })
})

gulp.task('hugo-preview', (cb) => {
    return spawn('hugo', ['--buildDrafts', '--buildFuture'], { stdio: 'inherit' }).on('close', (code) => {
        browserSync.reload()
        cb()
    })
})

// --

gulp.task('sass', () => {
    return gulp.src([
        'src/sass/**/*.scss'
    ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.print())
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sass({ precision: 5, importer: tildeImporter }))
    .pipe($.autoprefixer(['ie >= 10', 'last 2 versions']))
    .pipe($.if(isProduction, $.cssnano({ discardUnused: false, minifyFontValues: false })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.stream())
})

gulp.task('js-watch', ['js'], (cb) => {
    browserSync.reload();
    cb();
});

gulp.task('js', () => {
    return gulp.src([
        'src/js/**/*.js'
    ])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.print())
    .pipe(rollup(
      {
        plugins: [rollupResolve({ jsnext: true, main: true }), rollupCommonJS(), babel({
          exclude: 'node_modules/**',
          babelrc: false,
          presets: [ 'es2015-rollup' ],
          //presets: [ 'es2015', { 'modules': false } ]
          //plugins: [ 'external-helpers' ],
        })]
      }, 'iife')
    )
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('static/js'))
})

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest('static/fonts'));
});

gulp.task('images', () => {
    return gulp.src('src/images/**/*.{png,jpg,jpeg,gif,svg,webp}')
        .pipe($.newer('static/img'))
        .pipe($.print())
        .pipe($.imagemin())
        .pipe(gulp.dest('static/img'));
});

gulp.task('cms-delete', () => {
    return del(['static/admin'], { dot: true })
})
