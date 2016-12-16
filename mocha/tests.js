/* global before, chai, describe, it, PrettyError */

( function( $ ) {
  var expect = chai.expect;
  var jQueryMock;

  describe( 'prettyError jQuery plugin', function() {
    before(function() {
      jQueryMock = $( '.prettyErrorForm' ).prettyError();
    });
    it( 'is defined', function() {
      expect( jQueryMock ).to.have.property( 'prettyError' );
    });
    it( 'returns an array within the selectors', function() {
      expect( jQueryMock ).to.have.length.least(1);
    });
    it( 'can be chainable', function() {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class') ).to.contain( 'noMore' );
    });
    describe( 'Interaction', function() {
      beforeEach(function() {
        jQueryMock.find('#email').val('test@blah.es');
        $('.prettyErrorBtn')[0].click();
      });
      afterEach(function() {
        jQueryMock.find('#email').val('');
      });
      it( 'retrieves the invalid inputs field when the form is submited', function() {
        expect( $('.prettyErrorForm label > :invalid') ).to.have.length( 3 );
      });
      it( 'appends a div to each error', function() {
        expect( $('.prettyErrorForm .prettyError') ).to.have.length( 3 );
      });
      it( 'with the corresponding text error', function() {
        jQueryMock.find('#email').val('lol@gmail.');
        $('.prettyErrorBtn')[0].click();
        expect( $('.prettyError')[0].textContent ).to.be.eq( "'.' is used at a wrong position in 'gmail.'." );
      });
      it( 'sets focus to the first element with error', function() {
        expect( document.activeElement ).to.have.property('name').and.eq('telephone');
      });
    });
    describe( 'Plugin configuration', function() {
      it( 'can be configured', function() {
        $('.prettyErrorForm-2').prettyError({
          classError: 'myCustomName'
        });
        $('.prettyErrorBtn')[1].click();

        expect($('.prettyErrorForm-2 .myCustomName')).to.have.length(7);
      });
    });
  });
}( jQuery ));
