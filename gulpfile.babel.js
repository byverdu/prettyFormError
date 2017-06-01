import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'default', [ 'serve', 'watch' ]);
gulp.task( 'prouction', [ 'build' ]);
gulp.task( 'tests', [ 'serve-test', 'watch' ]);
gulp.task( 'docs', [ 'serve-docs', 'watch' ]);
