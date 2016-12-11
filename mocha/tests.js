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
    before(() => {
      jQueryMock = $( '.prettyError' ).prettyError();
    });
    it( 'is defined', () => {
      expect( jQueryMock ).to.have.property( 'prettyError' );
    });
    it( 'returns an array within the selectors', () => {
      expect( jQueryMock ).to.have.length.least(1);
    });
    it( 'can be chainable', () => {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class') ).to.contain( 'noMore' );
    });
    describe( 'Interaction', () => {
      beforeEach(() => {
        jQueryMock.find('#email').val('test@blah.es');
        $('.prettyErrorBtn')[0].click();
      });
      it( 'retrieves the invalid inputs field when the form is submited', () => {
        expect( $('.prettyError:first-child label > :invalid') ).to.have.length( 3 );
        jQueryMock.find('#email').val('');
      });
      it( 'appends a div to each error', () => {
        expect( $('.prettyError:first-child .error2') ).to.have.length( 3 );
      });
      it( 'with the corresponding text error', () => {
        jQueryMock.find('#telephone').val('lol!');
        $('.prettyErrorBtn')[0].click();
        expect( $('.error2')[0].textContent ).to.be.eq( 'Please match the requested format.' );
      });
    });
  });
}( jQuery ));
