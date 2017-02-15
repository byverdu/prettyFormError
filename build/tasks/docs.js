import gulp from 'gulp';
const cssnano = require( 'gulp-cssnano' );
const sourcemaps = require( 'gulp-sourcemaps' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const paths = require( '../paths' );

gulp.task( 'docs-sass', function () {
  return gulp.src( paths.srcSassDocs )
    .pipe( sass().on( 'error', sass.logError ))
    .pipe( gulp.dest( paths.destSassDocs ));
});

gulp.task('move-docs', ['docs-sass'], () => {
  gulp.src( paths.srcDocs )
    .pipe(gulp.dest( paths.destDocs ))
});

gulp.task( 'build-docs', [
  'move-docs'
]);
