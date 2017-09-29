const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const paths = require( '../paths' );
const stripCode = require( 'gulp-strip-code' );
const pump = require( 'pump' );

gulp.task( 'build-js', [ 'type-check-build' ],  ( callback ) => {
  pump([
    gulp.src( paths.srcJs ),
    uglify({ mangle: true }),
    sourcemaps.init({ loadMaps: true }),
    rename({
      basename: paths.minifiedOutput,
      suffix: '.min'
    }),
    sourcemaps.write( './' ),
    gulp.dest( paths.destDir )], callback );
});

gulp.task( 'move-js', [ 'build-js' ], () => {
  gulp.src( paths.srcJs )
  .pipe( stripCode({
    start_comment: 'dev-code',
    end_comment: 'end-dev-code'
  }))
  .pipe( gulp.dest( paths.destDir ));
});
