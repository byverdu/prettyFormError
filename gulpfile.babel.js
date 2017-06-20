import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build-all', [
  'type-check',
  'build-es',
  'build-jquery',
  'build-css'
]);

gulp.task( 'default', [ 'build-all' ]);
gulp.task( 'tests', [ 'serve-test', 'watch-test' ]);
gulp.task( 'docs', [ 'serve-docs', 'watch-docs' ]);
gulp.task( 'es', [ 'build-es', 'serve-es', 'watch-es' ]);
gulp.task( 'build-es', ['type-check', 'bundle-es']);
gulp.task( 'jquery', [ 'clean', 'serve-jquery', 'watch-dev' ]);
gulp.task( 'build-jquery', ['type-check', 'build-es', 'minify', 'move-js']);
