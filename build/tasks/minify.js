const gulp = require( 'gulp' );
const minify = require( 'gulp-minify' );
const paths = require( '../paths' );

gulp.task( 'minify', () => {
  gulp.src( paths.srcJs )
    .pipe( minify({
      ext: {
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe( gulp.dest( paths.destJs ));
});
