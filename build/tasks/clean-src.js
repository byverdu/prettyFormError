const gulp  = require( 'gulp' );
const stripLine  = require( 'gulp-strip-line' );

gulp.task( 'clean-src', ['build-css'], () => {
  return gulp
    .src( 'dit/prettyFormError.js' )
    .pipe( stripLine([
      /^\/\*\s*global PrettyFormError \*\//,
      /^\/\*\s* \*\//
    ]))
    .pipe( gulp.dest( 'src-tes' ));
});

