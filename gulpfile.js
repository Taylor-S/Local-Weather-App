///////////////////////////////////////////////
// Required
///////////////////////////////////////////////

var gulp = require('gulp'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
autoprefixer = require('gulp-autoprefixer');



///////////////////////////////////////////////
// html Task
///////////////////////////////////////////////
gulp.task('html', function() {
    gulp.src('app/index.html')
    .pipe(reload({stream:true}));
});

///////////////////////////////////////////////
// CSS/Sass Task
///////////////////////////////////////////////
gulp.task('css', function(){
    gulp.src('app/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

///////////////////////////////////////////////
// Scripts Task
///////////////////////////////////////////////
gulp.task('scripts', function () {
    gulp.src(['app/js/**/*.js'])
    .pipe(reload({stream:true}));
});


///////////////////////////////////////////////
// Watch Task
///////////////////////////////////////////////
gulp.task('watch',function() {
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/sass/**/*.sass', ['css']);
    gulp.watch('app/js/**/*.js', ['scripts']);
});

///////////////////////////////////////////////
// BrowserSync Task
///////////////////////////////////////////////
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir: './app'
        }
    });
});

///////////////////////////////////////////////
// Default Task
///////////////////////////////////////////////
gulp.task('default', ['html', 'css', 'scripts', 'watch', 'browser-sync']);;
