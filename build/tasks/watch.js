const gulp = require( 'gulp' );
const paths = require( '../paths' );
const reload = require( 'browser-sync' ).reload;

// outputs changes to files to the console
function reportChange( event ) {
  console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
}

gulp.task( 'watch-test', () => {
  gulp.watch( paths.watchMocha, [ 'type-check', reload ], ).on( 'change', reportChange );
});

gulp.task( 'watch-docs', () => {
  gulp.watch( paths.watchDocs, [ 'move-docs', 'docs-sass', reload]).on( 'change', reportChange );
});
