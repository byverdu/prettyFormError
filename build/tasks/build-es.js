const gulp = require( 'gulp' );
const browserify = require( 'browserify' );
const uglify = require( 'gulp-uglify' );
const source = require( 'vinyl-source-stream' );
const gutil = require( 'gulp-util' );
const rename = require( 'gulp-rename' );
const buffer = require( 'vinyl-buffer' );
const sourcemaps = require( 'gulp-sourcemaps' );
const babelify = require( 'babelify' );
const paths = require( '../paths' );

gulp.task( 'bundle-es', () => {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: paths.srcEs,
    debug: true,
    transform: [ babelify ],
    standalone: 'PrettyFormError'
  });

  return b.bundle()
    .pipe( source( 'bundle.js' ))
    .pipe( buffer())
    .pipe( sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe( uglify({ mangle: true }))
        .on( 'error', gutil.log )
    .pipe( rename({
      basename: paths.bundleOutput,
      suffix: '.min'
    }))
    .pipe( sourcemaps.write( './' ))
    .pipe( gulp.dest( paths.destJs ));
});
