const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const paths = require( '../paths' );

gulp.task( 'sass', function () {
  return gulp.src( paths.srcSass )
    .pipe( sass().on( 'error', sass.logError ))
    .pipe( gulp.dest( paths.destSass ));
});
