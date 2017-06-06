const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );
const paths = require( '../paths' );

gulp.task( 'serve-test', ['type-check'], ( done ) => {
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

gulp.task( 'serve-dev', [ 'build' ], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: [ paths.srcServe, './docs/' ],
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});

gulp.task( 'serve-docs', ['docs-sass', 'move-docs'], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: [ paths.destDocs ],
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});

gulp.task( 'serve-es', [ 'type-check' ], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: paths.srcDir,
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});
