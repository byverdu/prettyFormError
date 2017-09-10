/* global before, chai, describe, it, PrettyError */

( function( $ ) {
  var expect = chai.expect;
  var jQueryMock;

  describe( 'prettyFormError jQuery plugin', function() {
    before( function() {
      jQueryMock = $( '.errored-form' ).prettyFormError();
    });
    it( 'is defined', function() {
      expect( $.fn ).to.have.property( 'prettyFormError' );
    });
    it( 'returns an array within the selectors', function() {
      expect( jQueryMock ).to.have.length.least( 1 );
    });
    it( 'can be chainable', function() {
      jQueryMock.addClass( 'noMore' );
      expect( jQueryMock.attr( 'class' ))
        .to.contain( 'noMore' );
    });
    describe( 'Interaction', function() {
      beforeEach( function() {
        jQueryMock.find( '#email' ).val( 'test@blah.es' );
        $( '.prettyErrorBtn' )[ 0 ].click();
      });
      it( 'retrieves the invalid inputs field when the form is submited', function() {
        expect( $( '.errored-form :invalid' ).not( 'fieldset' ))
          .to.have.length( 3 );
      });
      it( 'appends a div to each error', function() {
        expect( $( '.errored-form .prettyFormError' ))
          .to.have.length( 3 );
      });
      it( 'with the corresponding text error', function() {
        jQueryMock.find( '#email' ).val( 'lol@gmail.' );
        $( '.prettyErrorBtn' )[ 0 ].click();

        expect( $( '.prettyFormError' )[ 0 ].textContent )
          .to.be.eq( "'.' is used at a wrong position in 'gmail.'." );
      });
      it( 'sets focus to the first element with error', function() {
        expect( document.activeElement )
          .to.have.property( 'name' ).and.eq( 'telephone' );
      });
    });
    describe( 'Plugin configuration', function() {
      describe( 'Default options', function() {
        var defaultOptions;
        before( function() {
          defaultOptions = jQueryMock.data( 'plugin_prettyFormError' );
        });
        it( 'are defined and is an Object', function() {
          expect( defaultOptions )
            .to.have.property( 'options' )
            .that.is.an( 'Object' );
        });
        it( 'contains a multiCheckbox property', function() {
          var multiCheckbox = defaultOptions.options.multiCheckbox;
          expect( multiCheckbox )
            .to.be.an( 'Object' );
          expect( multiCheckbox ).to.have.deep.property( 'enabled' ).and.is.a( 'Boolean' );
          expect( multiCheckbox ).to.have.deep.property( 'selector', '.multiCheckbox' );
        });
        it( 'contains a classError property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'classError' )
            .that.is.a( 'String' )
            .and.eq( 'prettyFormError' );
        });
        it( 'contains a positionMethod property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'positionMethod' )
            .that.is.a( 'String' )
            .and.eq( 'afterend' );
        });
        it( 'contains an elementError property', function() {
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
        it( 'contains a fadeOutError property', function() {
          expect( defaultOptions.options )
            .to.have.property( 'fadeOutError' )
            .that.is.an( 'Object' )
            .and.eql({fadeOut: false, fadeOutOpts: ''});
        });
      });
      it( 'can be configured', function() {
        $( '.errored-form-2' ).prettyFormError({
          classError: 'myCustomName',
          elementError: 'span',
          callToAction: '.prettyErrorBtn-2',
          focusErrorOnClick: false,
          fadeOutError: {fadeOut: true, fadeOutOpts: 6000},
          multiCheckbox: {
            enabled: true,
            selector: '.multiCheckbox'
          }
        });
        $( '.prettyErrorBtn-2' ).click();
        console.log($( '.errored-form-2' ).data())
        expect( $( '.errored-form-2 span.myCustomName' ))
          .to.have.length( 7 );
      });
    });
  });
}( jQuery ));
