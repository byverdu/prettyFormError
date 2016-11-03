import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );
console.log(require( 'require-dir' )( './build/tasks' ));

gulp.task( 'default', [ 'watch' ]);
