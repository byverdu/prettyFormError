const gulp = require( 'gulp' );
const cssnano = require( 'gulp-cssnano' );
const sourcemaps = require( 'gulp-sourcemaps' );
const rename = require( 'gulp-rename' );
const paths = require( '../paths' );

gulp.task( 'css-minify', [ 'sass' ], function () {
  return gulp.src( paths.srcCss )
  .pipe( rename({ suffix: '.min' }))
    .pipe( sourcemaps.init())
    .pipe( cssnano())
    .pipe( sourcemaps.write( '.' ))
    .pipe( gulp.dest( paths.destCss ));
});
