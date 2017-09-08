const gulp = require( 'gulp' );
const childProcess = require( 'child_process' );
const paths = require( '../paths' );
var flowBin = require( 'flow-bin' );

gulp.task( 'type-check', [ 'clean' ], () => {
  return childProcess.execFile( flowBin, ['check'], ( flowErr, flowStdout, flowStderr ) => {
    if ( flowErr ) {
      console.log( flowStdout );
      return;
    }

    console.log( flowStdout );
    childProcess.execSync( paths.processCommand, ( stripErr, stripStdout, stripStderr ) => {
      if ( stripErr ) {
        console.log( flowStdout );
        return;
      }
      console.log( stripStdout );
    });
  });
});

