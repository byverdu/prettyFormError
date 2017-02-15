const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );
const paths = require( '../paths' );

gulp.task( 'serve', [ 'build' ], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: [ paths.srcServe ],
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});

gulp.task( 'serve-docs', [ 'build-docs' ], ( done ) => {
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
