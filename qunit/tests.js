/* global QUnit, expect */

function xoxo() {
  return 4
}

QUnit.test( 'max', function( assert ) {
  // syncronous helper, number of assertions
  expect( 1 );

   assert.equal(xoxo(), 4, 'xoxo');
});
