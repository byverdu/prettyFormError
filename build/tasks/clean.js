import del from 'del';
import gulp from 'gulp';
const paths = require( '../paths' );

gulp.task( 'clean', () => {
  return del([ paths.destDir ]);
});
