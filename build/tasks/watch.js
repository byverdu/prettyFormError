const gulp = require( 'gulp' );
const paths = require( '../paths' );

// outputs changes to files to the console
function reportChange( event ) {
  console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
}

gulp.task( 'watch', () => {
  gulp.watch( paths.srcJs, [ 'minify', 'move-js' ]).on( 'change', reportChange );
  gulp.watch( paths.srcSass, [ 'sass', 'css-minify' ]).on( 'change', reportChange );
});
