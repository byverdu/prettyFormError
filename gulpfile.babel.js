import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build-all', [
  'type-check',
  'build-es',
  'build-css'
]);

gulp.task( 'default', [ 'build-all' ]);
gulp.task( 'tests', [ 'serve-test', 'watch-test' ]);
gulp.task( 'util-tests', [ 'build-utils', 'watch-utils' ]);
gulp.task( 'docs', [ 'serve-docs', 'watch-docs' ]);
gulp.task( 'es', [ 'build-es', 'serve-es', 'watch-es' ]);
gulp.task( 'build-es', ['type-check', 'bundle-es']);
