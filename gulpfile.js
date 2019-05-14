/*!
 * gulp
 * $ npm install del gulp gulp-ruby-sass gulp-autoprefixer gulp-cache gulp-cssnano gulp-imagemin gulp-livereload gulp-minify-css gulp-notify gulp-rename gulp-sourcemaps streamqueue --save-dev
*/

// Load plugins
var gulp = require('gulp'),
  del = require('del');
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uncss = require('gulp-uncss'),
  cache = require('gulp-cache'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  streamqueue = require('streamqueue'),
  critical = require('critical'),
  inlineCss = require('gulp-inline-css'),
  runSequence = require('run-sequence');


// Styles
gulp.task('styles', function () {
  return gulp.src('assets/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest( 'assets/css'))
    .pipe(gulp.dest( '_site/assets/css'))
    .pipe(notify({message: 'Styles task complete'}))
});

// UnCSS
gulp.task('styles-uncss', function () {
  return gulp.src('assets/css')
  .pipe(uncss({
    html: ['_site/index.html'],
    timeout: 1000
  }))
  .pipe(gulp.dest( '_site/assets/css'))
  .pipe(notify({message: 'Styles - UnCSS task complete'}))
});

// Inline Critical CSS
gulp.task('styles-inline', done => {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/app.min.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '_includes/critical.min.css',
    minify: true,
    extract: false,
    ignore: ['font-face']
  });
  done();
});

// Images
gulp.task('images', function () {
  return streamqueue({objectMode: true},
    gulp.src('assets/images/**/*{.jpg,.png,.gif}')
      .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
      // .pipe(notify({message: 'Image minifed'}))
      .pipe(gulp.dest('assets/images/'))
      .pipe(gulp.dest('_site/assets/images/'))
  )
});


// Clean
gulp.task('clean', function () {
  return del('_site/assets/', {force: true});
});


// Default task
gulp.task('default', gulp.series('clean', 'styles', 'images', 'styles-uncss', 'styles-inline'), function() { });

// Watch task
gulp.task('watch', function () {

  // Watch .scss files
  gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));

  // Watch image files
  gulp.watch('images/**/*.{png,gif,jpg}', gulp.series('images'));

  // Create LiveReload server
  livereload.listen();

  // Watch any files in _site, reload on change
  gulp.watch(['_site/assets/**/*']).on('change', livereload.changed);

});