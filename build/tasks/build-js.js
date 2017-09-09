const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const paths = require( '../paths' );
const stripCode = require( 'gulp-strip-code' );

gulp.task( 'build-js', [ 'type-check' ],  () => {
  gulp.src( paths.srcJs )
  .pipe( uglify({ mangle: true }))
  .pipe( sourcemaps.init({ loadMaps: true }))
  .pipe( rename({
    basename: paths.minifiedOutput,
    suffix: '.min'
  }))
  .pipe( sourcemaps.write( './' ))
    .pipe( gulp.dest( paths.destDir ));
});

gulp.task( 'move-js', [ 'build-js' ], () => {
  gulp.src( paths.srcJs )
  .pipe( stripCode({
    start_comment: 'dev-code',
    end_comment: 'end-dev-code'
  }))
  .pipe( gulp.dest( paths.destDir ));
});
