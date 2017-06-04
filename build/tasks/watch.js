const gulp = require( 'gulp' );
const paths = require( '../paths' );
const reload = require( 'browser-sync' ).reload;

// outputs changes to files to the console
function reportChange( event ) {
  console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
}

gulp.task( 'watch-dev', () => {
  gulp.watch( paths.watchMocha, [ 'flow', reload ], ).on( 'change', reportChange );
});

gulp.task( 'watch', () => {
  // gulp.watch( paths.srcJs, [ 'minify', 'move-js', 'move-docs', reload ]).on( 'change', reportChange );

  // gulp.watch( paths.srcSass, [ 'sass', 'css-minify', reload ]).on( 'change', reportChange );

  gulp.watch( paths.watchMocha, reload ).on( 'change', reportChange );

  gulp.watch( paths.watchDocs, [ 'move-docs', 'docs-sass', reload]).on( 'change', reportChange );
});
