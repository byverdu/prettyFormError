const gulp = require( 'gulp' );
const qunit = require( 'gulp-qunit' );
const paths = require( '../paths' );

gulp.task( 'qunit', function () {
  return gulp.src( paths.srcQunit )
          .pipe( qunit());
});
