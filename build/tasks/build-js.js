const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const paths = require( '../paths' );
const gutil = require( 'gulp-util' );
console.log(paths.srcJs)

gulp.task( 'build-js', [ 'type-check' ],  () => {
  gulp.src( paths.srcJs )
  // .pipe( uglify({ mangle: true }))
  .pipe( sourcemaps.init({ loadMaps: true }))
  .pipe( rename({
    basename: paths.minifiedOutput,
    suffix: '.min'
  }))
  .pipe( sourcemaps.write( './' ))
    .pipe( gulp.dest( paths.destJs ));
});
