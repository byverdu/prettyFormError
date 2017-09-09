const gulp = require( 'gulp' );
const childProcess = require( 'child_process' );
const paths = require( '../paths' );
var flowBin = require( 'flow-bin' );

gulp.task( 'type-check', [ 'clean'], () => {
  return new Promise(( resolve ) => {
    const execFile = childProcess.execFile( flowBin, ['check']);
    execFile.stdout.on( 'data', ( data ) => {
      console.log( `stdout: ${data}` );
    });
    execFile.addListener( 'exit', ( exitData ) => {
      if ( exitData === 0 ) {
        childProcess.exec( paths.processCommand, () => {
          resolve( true );
        });
      }
    });
  });
});
