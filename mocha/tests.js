/* global before, chai, describe, it, PrettyError */

const expect = chai.expect;
let prettyError;
describe( 'PrettyError constructor', () => {
  beforeEach(() => {
    prettyError = new PrettyError();
  });
  it( 'is defined', () => {
    expect( PrettyError ).not.to.be.eql( undefined );
  });
  it( 'has a setSettings property', () => {
    expect( prettyError ).to.have.property( 'setSettings' ).and.is.an.instanceOf( 'Function' );
  });
  it( 'invokes setSettings when is initialized', () => {
    const spySetSettings = sinon.spy( prettyError, 'setSettings' );
    expect( spySetSettings.callCount ).to.eq( 1 );
  });
  it( 'is called', () => {
    // const mock = sinon.stub();
    // mock.setColor = sinon.spy();
    console.log(sinon);
    expect( sinon ).not.to.be.eql( undefined );
  });
});
