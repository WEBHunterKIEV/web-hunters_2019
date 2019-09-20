const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
//const autoprefixer = require('gulp-autoprefixer');



// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "distr"
        }
    });

    gulp.watch('distr/**/*').on('change', browserSync.reload);
});


// PUG
gulp.task('compile:pug', function buildHTML() {
    return gulp.src('dev/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('distr'))
});


// SASS 
gulp.task('compile:sass', function () {
    return gulp.src('dev/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('distr/css'));
});

// autoprefixer 
/*
gulp.task('autoprefixer', function () {
    return gulp.src('distr/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 16 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('distr/css/autoprefix/'))
});*/

// WATCHERS
gulp.task('watch', function() {
    gulp.watch('dev/template/**/*.pug', gulp.series('compile:pug'));
    gulp.watch('dev/styles/**/*.scss', gulp.series('compile:sass'));
})

// default
gulp.task('default', gulp.series(
    gulp.parallel('compile:pug','compile:sass'),
    gulp.parallel('watch','server')
))





   
