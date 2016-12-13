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
      afterEach(() => {
        jQueryMock.find('#email').val('');
      });
      it( 'retrieves the invalid inputs field when the form is submited', () => {
        expect( $('.prettyErrorForm label > :invalid') ).to.have.length( 3 );
      });
      it( 'appends a div to each error', () => {
        expect( $('.prettyErrorForm .prettyError') ).to.have.length( 3 );
      });
      it( 'with the corresponding text error', () => {
        jQueryMock.find('#email').val('lol@gmail.');
        $('.prettyErrorBtn')[0].click();
        expect( $('.prettyError')[0].textContent ).to.be.eq( `'.' is used at a wrong position in 'gmail.'.` );
      });
      it( 'sets focus to the first element with error', () => {
        expect( document.activeElement ).to.have.property('name').and.eq('telephone');
      });
    });
    describe( 'Plugin configuration', () => {
      it( 'has a defaultOpts property with the configurable props', () => {
        expect($.fn.prettyError.defaultOpts).not.eq(undefined);
      });
      it( 'has a prop classError with default value of prettyError', () => {
        expect($.fn.prettyError.defaultOpts).to.have.property('classError').and.eq( 'prettyError' );
      });
      it( 'has a prop position with default value of after', () => {
        expect($.fn.prettyError.defaultOpts).to.have.property('position').and.eq( 'after' );
      });
      it( 'can be configured', () => {
        $('.prettyErrorForm-2').prettyError({
          classError: 'myCustomName'
        });
        $('.prettyErrorBtn')[1].click();

        expect($('.prettyErrorForm-2 .myCustomName')).to.have.length(7);
      });
    });
  });
}( jQuery ));
