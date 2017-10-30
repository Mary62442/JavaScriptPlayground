let gulp = require('gulp');
let webserver = require('gulp-webserver');
let uglify = require('gulp-uglify');
let uglifycss = require('gulp-uglifycss');
let babel = require('gulp-babel');

//In order for tasks to work in sequence
//make sure the tasks return a stream or promise, or handle the callback

gulp.task('uglifycss', ()=> {
  return  gulp.src('css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ()=> {
    gulp.watch('css/**/*.css', ['uglifycss']);
    gulp.watch('scripts/**/*.js', ['compressjs']);
});
 
gulp.task('webserver', ['uglifycss', 'compressjs'], ()=> {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

// Javascript minification task
gulp.task('compressjs', (cb) => {
  return gulp.src(['scripts/*.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
    cb   
});


gulp.task('default', ['webserver','watch']);

