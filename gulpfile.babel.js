import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build', [ 'minify', 'sass', 'css-minify' ]);
gulp.task( 'default', [ 'build', 'watch' ]);
