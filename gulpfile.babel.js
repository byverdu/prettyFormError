import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build', [
  'clean',
  'build-js',
  'move-js',
  'build-css'
]);

gulp.task( 'default', [ 'build']);
gulp.task( 'test', [ 'serve-test', 'watch-test' ]);
gulp.task( 'docs', [ 'serve-docs', 'watch-docs' ]);
