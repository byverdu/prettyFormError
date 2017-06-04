import gulp from 'gulp';
const sass = require( 'gulp-sass' );
const paths = require( '../paths' );

gulp.task( 'docs-sass', () => {
  return gulp.src( paths.srcSassDocs )
    .pipe( sass().on( 'error', sass.logError ))
    .pipe( gulp.dest( paths.destSassDocs ));
});

gulp.task( 'move-docs', ['docs-sass'], () => {
  gulp.src( paths.srcDocs )
    .pipe( gulp.dest( paths.destDocs ));
});

