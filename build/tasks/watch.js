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

gulp.task( 'watch-utils', () => {
  gulp.watch( paths.watchMocha, [ 'build-utils', reload ], ).on( 'change', reportChange );
});

gulp.task( 'watch-jquery', () => {
  gulp.watch( paths.watchDev, [ 'build', reload ], ).on( 'change', reportChange );
});

gulp.task( 'watch-docs', () => {
  gulp.watch( paths.watchDocs, [ 'move-docs', 'docs-sass', reload]).on( 'change', reportChange );
});

gulp.task( 'watch-es', () => {
  gulp.watch( paths.watchEs, [ 'type-check', 'build-es', reload ], ).on( 'change', reportChange );
});


// const gulp = require( 'gulp' );
// const paths = require( '../paths' );
// const reload = require( 'browser-sync' ).reload;

// // outputs changes to files to the console
// function reportChange( event ) {
//   console.log( `File ${event.path} was ${event.type} \nrunning tasks...` );
// }

// gulp.task( 'watch', () => {
//   gulp.watch( paths.srcPath, [ 'build-html', 'build-scss', reload ]).on( 'change', reportChange );
// });
