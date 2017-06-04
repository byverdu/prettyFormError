const gulp = require( 'gulp' );
const flow = require( 'gulp-flowtype' );
const childProcess = require( 'child_process' );
const browserSync = require( 'browser-sync' );
const paths = require( '../paths' );

gulp.task( 'type-check', () => {
  return gulp.src( paths.srcDev )
    .pipe( flow({
      abort: true
    }))
    .pipe( gulp.dest( paths.srcDir ));
});

gulp.task( 'strip-types', ['type-check'], () => {
  childProcess.exec( paths.processCommand );
});

gulp.task( 'flow', ['type-check', 'strip-types']);

gulp.task( 'build-dev', ['flow'], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    reloadDelay: 2000,
    server: {
      baseDir: paths.srcMocha,
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});
