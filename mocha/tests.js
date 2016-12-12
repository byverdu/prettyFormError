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
    it( 'has a options property', () => {
      expect( prettyError ).to.have.property( 'options' ).and.is.an( 'Object' );
    });
  });
  describe( 'prettyError jQuery plugin', () => {
    before(() => {
      jQueryMock = $( '.prettyErrorForm' ).prettyError();
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
        expect( $('.prettyErrorForm:first-child label > :invalid') ).to.have.length( 3 );
      });
      it( 'appends a div to each error', () => {
        expect( $('.prettyErrorForm:first-child .prettyError') ).to.have.length( 3 );
      });
      it( 'with the corresponding text error', () => {
        jQueryMock.find('#telephone').val('lol!');
        $('.prettyErrorBtn')[0].click();
        expect( $('.prettyError')[0].textContent ).to.be.eq( 'Please match the requested format.' );
      });
    });
    describe( 'Plugin configuration', () => {
      it( 'has a settings property with the configurable props', () => {
        expect($.fn.prettyError.settings).not.eq(undefined);
      });
      it( 'has a prop classError with default value of prettyError', () => {
        expect($.fn.prettyError.settings).to.have.property('classError').and.eq( 'prettyError' );
      });
    });
  });
}( jQuery ));
