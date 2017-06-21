/* global PrettyFormError, chai, sinon */
import chai, { expect } from 'chai';
import { utils } from '../src-dev/utils/module-es.js';
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
    beforeEach(() => {
      sinon.spy( console, 'warn' );
    });

    afterEach(() => {
      console.warn.restore();
    });
    it( 'is defined and is a function', () => {
      expect( utils._valuePositonChecker ).not.eq( undefined );
      expect( utils._valuePositonChecker ).to.be.a( 'Function' );
    });
    it( 'returns a string', ( ) => {
      expect( utils._valuePositonChecker()).to.be.an( 'string' );
    });
    it( 'a defualt "afterend" value is set', ( ) => {
      expect( utils._valuePositonChecker()).to.eq( 'afterend' );
    });
    it( 'if user value is different than "afterend" or "beforebegin" a default value is set', ( ) => {
      expect( utils._valuePositonChecker( 'xoxo' )).to.eq( 'afterend' );
    });
    it( 'if user value is different than "afterend" or "beforebegin" console warning is thrown', ( ) => {
      const text = 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned';
      utils._valuePositonChecker( 'xoxo' );
      expect( console.warn ).to.have.been.calledOnce;
      expect( console.warn ).to.have.been.calledWith( text );
    });
    it( 'lowercases any user input', ( ) => {
      expect( utils._valuePositonChecker( 'AfterEnD' )).to.eq( 'afterend' );
    });
  });
});
