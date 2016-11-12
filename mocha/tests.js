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
  });
  describe( 'prettyError jQuery plugin', () => {
    beforeEach(() => {
      jQueryMock = $( '.prettyError' ).prettyError();
    });
    afterEach(() => {
      jQueryMock = null;
    })
    it( 'is defined', () => {
      expect( jQueryMock ).to.have.property( 'prettyError' );
    });
    it( 'returns an array within the selectors', () => {
      console.log(jQueryMock);
      expect( jQueryMock ).to.have.length.least(1);
    });
    it( 'can be chainable', () => {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class') ).to.contain( 'noMore' );
    });
    it( 'retrieves the invalid inputs field when the form is submited', () => {
      $('.prettyErrorBtn')[0].click();
      expect( $('.prettyError:first-child label > :invalid') ).to.have.length( 4 );
    });
    it( 'retrieves the invalid inputs field when the form is submited', () => {
      $('.prettyErrorBtn')[1].click();
      expect( $('.prettyError:last-child label > :invalid') ).to.have.length( 7 );
    });
  });
}( jQuery ));
