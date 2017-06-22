/* global PrettyFormError, chai, sinon */
import chai, { expect } from 'chai';
import { utils } from '../src-dev/utils';
import sinon from 'sinon';
const sinonChai = require( 'sinon-chai' );
chai.use( sinonChai );

describe( 'PrettyFormError utils', () => {
  it( 'is defined', () => {
    expect( utils ).not.eq( undefined );
  });
  it( 'is an object', () => {
    expect( utils ).to.be.an( 'Object' );
  });
  describe( 'has a _valuePositonChecker method', () => {
    const _valuePositonChecker = ( userValue = 'afterend' ) => {
      const notFound = [ 'beforebegin', 'afterend' ].indexOf( userValue.toLowerCase()) === -1;
      if ( notFound ) {
        console.warn( 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned' );
      }
      return notFound ?
        'afterend' :
        userValue.toLowerCase();
    };
    beforeEach(() => {
      sinon.spy( console, 'warn' );
    });

    afterEach(() => {
      console.warn.restore();
    });
    it( 'is defined and is a function', () => {
      expect( _valuePositonChecker ).not.eq( undefined );
      expect( _valuePositonChecker ).to.be.a( 'Function' );
    });
    it( 'returns a string', ( ) => {
      expect( _valuePositonChecker()).to.be.an( 'string' );
    });
    it( 'a defualt "afterend" value is set', ( ) => {
      expect( _valuePositonChecker()).to.eq( 'afterend' );
    });
    it( 'if user value is different than "afterend" or "beforebegin" a default value is set', ( ) => {
      expect( _valuePositonChecker( 'xoxo' )).to.eq( 'afterend' );
    });
    it( 'if user value is different than "afterend" or "beforebegin" console warning is thrown', ( ) => {
      const text = 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned';
      _valuePositonChecker( 'xoxo' );
      expect( console.warn ).to.have.been.calledOnce;
      expect( console.warn ).to.have.been.calledWith( text );
    });
    it( 'lowercases any user input', ( ) => {
      expect( _valuePositonChecker( 'AfterEnD' )).to.eq( 'afterend' );
    });
  });
  describe( 'has a _setOpts method', () => {
    beforeEach(() => {
      sinon.spy( utils, '_setOpts' );
    });

    afterEach(() => {
      utils._setOpts.restore();
    });
    it( 'is defined and is a function', () => {
      expect( utils._setOpts ).not.eq( undefined );
      expect( utils._setOpts ).to.be.a( 'Function' );
    });
    it( 'returns an Object', ( ) => {
      expect( utils._setOpts()).to.be.an( 'Object' );
    });
    it( 'a defualt "Object value is set with all default props for the plugin', ( ) => {
      utils._setOpts();
      expect( utils._setOpts ).to.have.been.calledOnce;
      expect( utils._setOpts ).to.have.returned({
        callToAction: 'button',
        elementError: 'div',
        classError: 'prettyFormError',
        positionMethod: 'afterend',
        focusErrorOnClick: true,
        fadeOutError: {fadeOut: false, fadeOutOpts: ''},
        multiCheckbox: {enabled: false, selector: '.multiCheckbox'}
      });
    });
  });
});
