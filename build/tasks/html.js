const gulp = require( 'gulp' );
const paths = require( '../paths' );

gulp.task( 'move-html', () => {
  gulp.src( paths.srcHtml )
    .pipe( gulp.dest( paths.destHtml ));
});
