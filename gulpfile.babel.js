import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build', [
  'type-check',
  'build-jquery',
  'build-css'
]);

gulp.task( 'default', [ 'build' ]);
gulp.task( 'tests', [ 'serve-test', 'watch-test' ]);
gulp.task( 'jquery', [ 'clean', 'serve-jquery', 'watch-dev' ]);
gulp.task( 'docs', [ 'serve-docs', 'watch-docs' ]);
gulp.task( 'es', [ 'serve-es', 'watch-es' ]);
