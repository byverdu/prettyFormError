/* global PrettyFormError, chai, sinon */

let prettyForm;
const { expect } = chai;
let spy;

describe( 'PrettyFormError es6 module', () => {
  beforeEach(() => {
    prettyForm = PrettyFormError();
  });

  it( 'is defined', () => {
    expect( PrettyFormError ).not.eq( undefined );
  });
  describe( 'init method', () => {
    beforeEach(() => {
      spy = sinon.spy( prettyForm, 'init' );
    });
    after(() => {
      spy.restore();
    });
    it( 'is defined', () => {
      expect( prettyForm.init ).not.eq( undefined );
    });
    it( 'can be called without arguments', ( ) => {
      prettyForm.init();
      expect( spy.calledOnce ).to.equal( true );
    });
    it( 'can be called targetting HTML Elements', ( ) => {
      const forms = document.querySelectorAll( 'form' );
      prettyForm.init( forms );
      expect( spy.calledWith( forms )).to.equal( true );
    });
  });
});
