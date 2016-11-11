/* global before, chai, describe, it, PrettyError */

( function ( $ ) {
  const expect = chai.expect;
  let prettyError;
  let jQueryMock;

  describe( 'PrettyError constructor', () => {
    beforeEach(() => {
      prettyError = new PrettyError();
    });
    it( 'is defined', () => {
      expect( PrettyError ).not.to.be.eql( undefined );
    });
    it( 'has a jQuery element property', () => {
      expect( prettyError ).to.have.property( '$element' ).and.is.an.instanceOf( $ );
    });
    describe( 'prettyError jQuery plugin', () => {
      beforeEach(() => {
        jQueryMock = $( '.prettyError' ).prettyError();
      });
      it( 'is defined', () => {
        const $div = $( '<div />' );
        expect( jQueryMock ).to.have.property( 'prettyError' );
      });
      it( 'returns an array within the selectors', () => {
        console.log(jQueryMock);
        expect( jQueryMock ).to.have.length.least(2);
      });
      it( 'can be chainable', () => {
        jQueryMock.addClass( 'noMore' );
        expect( jQueryMock.attr( 'class') ).to.contain( 'noMore' );
      });
    });
  });
}( jQuery ));
