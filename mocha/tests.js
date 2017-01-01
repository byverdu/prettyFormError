/* global before, chai, describe, it, PrettyError */

( function( $ ) {
  var expect = chai.expect;
  var jQueryMock;

  describe( 'prettyError jQuery plugin', function() {
    before(function() {
      jQueryMock = $( '.prettyErrorForm' ).prettyError();
    });
    it( 'is defined', function() {
      expect( $.fn ).to.have.property( 'prettyError' );
    });
    it( 'returns an array within the selectors', function() {
      expect( jQueryMock ).to.have.length.least(1);
    });
    it( 'can be chainable', function() {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class') )
        .to.contain( 'noMore' );
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
        expect( $('.prettyErrorForm label > :invalid') )
          .to.have.length( 3 );
      });
      it( 'appends a div to each error', function() {
        expect( $('.prettyErrorForm .prettyError') )
          .to.have.length( 3 );
      });
      it( 'with the corresponding text error', function() {
        jQueryMock.find('#email').val('lol@gmail.');
        $('.prettyErrorBtn')[0].click();

        expect( $('.prettyError')[0].textContent )
          .to.be.eq( "'.' is used at a wrong position in 'gmail.'." );
      });
      it( 'sets focus to the first element with error', function() {
        expect( document.activeElement )
          .to.have.property('name').and.eq('telephone');
      });
    });
    describe( 'Plugin configuration', function() {
      describe('Default options', function() {
        var defaultOptions;
        before( function() {
          defaultOptions = jQueryMock.data( 'plugin_prettyError' );
        });
        it( 'are defined and is an Object', function() {
          expect( defaultOptions )
            .to.have.property( 'options' )
            .that.is.an( 'Object' );
        });
        it( 'contains a classError property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'classError' )
            .that.is.a( 'String' )
            .and.eq( 'prettyError' );
        });
        it( 'contains a positionMethod property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'positionMethod' )
            .that.is.a( 'String' )
            .and.eq( 'after' );
        });
        it( 'contains a elementError property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'elementError' )
            .that.is.a( 'String' )
            .and.eq( 'div' );
        });
        it( 'contains a callToAction property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'callToAction' )
            .that.is.a( 'String' )
            .and.eq( 'button' );
        });
        it( 'contains a focusErrorOnClick property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'focusErrorOnClick' )
            .that.is.a( 'Boolean' )
            .and.eq( true );
        });
      });
      it( 'can be configured', function() {
        $('.prettyErrorForm-2').prettyError({
          classError: 'myCustomName',
          elementError: 'span',
          callToAction: '.prettyErrorBtn',
          focusErrorOnClick: false
        });
        $('.prettyErrorBtn')[1].click();

        expect($('.prettyErrorForm-2 span.myCustomName'))
          .to.have.length(7);
      });
    });
  });
}( jQuery ));
