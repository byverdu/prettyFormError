import { typeCheckPromise } from './type-check';
const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const paths = require( '../paths' );

gulp.task( 'build-js', () => {
  return typeCheckPromise().then(() => {
    return gulp.src( paths.srcJs )
    .pipe( uglify({ mangle: true }))
    .pipe( sourcemaps.init({ loadMaps: true }))
    .pipe( rename({
      basename: paths.minifiedOutput,
      suffix: '.min'
    }))
    .pipe( sourcemaps.write( './' ))
      .pipe( gulp.dest( paths.destDir ));
  })
  .catch( err => console.log( err ));
});
