/* global prettyFormError, chai, sinon */

var prettyForm;
var { expect } = chai;

before( function() {
  prettyForm = prettyFormError( '.errored-form' );
});
describe( 'prettyFormError javascript plugin', function() {
  it( 'is defined', function() {
    expect( window ).to.have.property( 'prettyFormError' );
  });
  describe( 'Interaction', function() {
    beforeEach( function() {
      document.querySelector( '#email' ).value =  'test@blah.es';
      document.querySelector( '.prettyErrorBtn' ).click();
    });
    it( 'retrieves the invalid inputs field when the form is submited', function() {
      expect( $( '.errored-form :invalid' ).not( 'fieldset' ))
        .to.have.length( 3 );
    });
    it( 'appends a div to each error', function() {
      expect( document.querySelectorAll( '.errored-form .prettyFormError' ))
        .to.have.length( 3 );
    });
    it( 'with the corresponding text error', function() {
      document.querySelector( '#email' ).value =  'test@gmail.';
      document.querySelector( '.prettyErrorBtn' ).click();

      expect( document.querySelector( '.prettyFormError' ).textContent )
        .to.be.eq( "'.' is used at a wrong position in 'gmail.'." );
    });
    it( 'sets focus to the first element with error', function() {
      expect( document.activeElement )
        .to.have.property( 'name' ).and.eq( 'telephone' );
    });
  });
  describe( 'Plugin configuration', function() {
    describe( 'Default options', function() {
      var defaultOptions2, prettyForm2;
      beforeEach( function() {
        prettyForm2 = prettyFormError( '.errored-form' );
        defaultOptions2 = prettyForm2.options;
      });
      it( 'are defined and is an Object', function() {
        expect( prettyForm2 )
          .to.have.property( 'options' )
          .that.is.an( 'Object' );
      });
      it( 'contains a multiCheckbox property', function() {
        var multiCheckbox = defaultOptions2.multiCheckbox;
        expect( multiCheckbox )
          .to.be.an( 'Object' );
        expect( multiCheckbox ).to.have.deep.property( 'enabled' ).and.is.a( 'Boolean' );
        expect( multiCheckbox ).to.have.deep.property( 'selector', '.multiCheckbox' );
      });
      it( 'contains a classError property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'classError' )
          .that.is.a( 'String' )
          .and.eq( 'prettyFormError' );
      });
      it( 'contains a positionMethod property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'positionMethod' )
          .that.is.a( 'String' )
          .and.eq( 'afterend' );
      });
      it( 'contains an elementError property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'elementError' )
          .that.is.a( 'String' )
          .and.eq( 'div' );
      });
      it( 'contains a callToAction property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'callToAction' )
          .that.is.a( 'String' )
          .and.eq( 'button' );
      });
      it( 'contains a focusErrorOnClick property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'focusErrorOnClick' )
          .that.is.a( 'Boolean' )
          .and.eq( true );
      });
      it( 'contains a fadeOutError property', function() {
        expect( defaultOptions2 )
          .to.have.property( 'fadeOutError' )
          .that.is.an( 'Object' )
          .and.eql({fadeOut: false, timer: 0});
      });
    });
  });
});
