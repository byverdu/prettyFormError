const gulp = require( 'gulp' );
const paths = require( '../path' );

// outputs changes to files to the console
function reportChange( event ) {
  console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
}

gulp.task( 'watch', () => {
  gulp.watch( paths.srcJs, [ 'minify' ]).on( 'change', reportChange );
});
