// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./src/css/*.css')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', function() {
    return browserify('src/js/index.js', {debug: true})
        .transform('babelify', {presets: ["es2015", "react"]})
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/*.*',
    'src/js/main.js'
    ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true,
    //   // don't remove IDs from SVGs, they are often used
    //   // as hooks for embedding and styling
    //   svgoPlugins: [{cleanupIDs: false}]
    // })))
    .pipe(gulp.dest('dist/images'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['lint', 'build']);
    gulp.watch('./src/*.html', ['extras']);
    gulp.watch('./src/scss/*.scss', ['sass']);
});

  gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9099,
    server: {
      baseDir: ['dist']
    }
  });
});

// run a local webserver with LiveReload
gulp.task('webserver', function() {
  gulp.src('src')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

// Default Task
gulp.task('default', ['lint', 'sass', 'build', 'watch']);

// Default Task
gulp.task('todist', ['images', 'sass', 'extras', 'build']);
