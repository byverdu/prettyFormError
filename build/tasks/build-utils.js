/* eslint-disable import/no-extraneous-dependencies*/
import gulp from 'gulp';
import mocha from 'gulp-mocha';

const paths = require( '../paths' );

const mochaOpts = {
  compilers: 'js:babel-core/register',
  globals: ['browser']
};

gulp.task( 'build-utils', ['type-check'], () => {
  gulp.src( paths.srcTestUtils )
    .pipe( mocha( mochaOpts ));
});
