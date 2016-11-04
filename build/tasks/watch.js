const gulp = require( 'gulp' );
const paths = require( '../paths' );
const browserSync = require( 'browser-sync' );

// outputs changes to files to the console
function reportChange( event ) {
  console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
}

gulp.task( 'watch', () => {
  gulp.watch( paths.srcJs, [ 'minify', 'move-js', browserSync.reload ]).on( 'change', reportChange );
  gulp.watch( paths.srcSass, [ 'sass', 'css-minify', browserSync.reload ]).on( 'change', reportChange );
  gulp.watch( paths.srcHtml, [ 'move-html', browserSync.reload ]).on( 'change', reportChange );
  gulp.watch( paths.watchQunit, [ 'qunit' ]);
});
