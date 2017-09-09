const childProcess = require( 'child_process' );
const paths = require( '../paths' );
var flowBin = require( 'flow-bin' );

export function typeCheckPromise() {
  return new Promise(( resolve ) => {
    const execFile = childProcess.execFile( flowBin, ['check']);
    execFile.stdout.on( 'data', ( data ) => {
      console.log('stdout: ' + data );
    });
    execFile.addListener( 'exit', ( exitData ) => {
      if ( exitData === 0 ) {
        childProcess.exec( paths.processCommand, () => {
          resolve( true );
        });
      }
    });
  });
}
