import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import uglifycss from 'gulp-uglifycss';
import sourcemaps from 'gulp-sourcemaps';
import { create as bsCreate } from 'browser-sync';
const browserSync = bsCreate();

gulp.task('es6', () => {
    return gulp.src('./js/src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js/dist'))
})

gulp.task('style', () => {
    return gulp.src('./styles/sass/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('./styles/css'))
        .pipe(browserSync.stream());
})

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('fileinclude', () => {
    gulp.src(['html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('default', ['browser-sync', 'es6', 'style', 'fileinclude'] , () => {
    gulp.watch('./styles/sass/**/**.scss', ['style']);
    gulp.watch('./html/**.html', ['fileinclude']).on('change', browserSync.reload);
    gulp.watch('./html/**/**.html', ['fileinclude']).on('change', browserSync.reload);
    gulp.watch('./js/src/*.js', ['es6']).on('change', browserSync.reload);
});