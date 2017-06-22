// @flow
/* global IprettyError */

/**
 * Assignement a default value and checking valid one for positionMethod prop
 * @param {string} [userValue='afterend'] user value
 * @returns {string} value for positionMethod prop
 */
const _valuePositonChecker = ( userValue: string = 'afterend' ) => {
  const notFound = [ 'beforebegin', 'afterend' ].indexOf( userValue.toLowerCase()) === -1;
  if ( notFound ) {
    console.warn( 'positionMethod prop value should be "beforebegin" or "afterend", a default "afterend" value has been assigned' );
  }
  return notFound ?
    'afterend' :
    userValue.toLowerCase();
};

export const utils = {
  /** Setting defualt properties values if user
   *  doesn't specify them
   * @param {IprettyError} options Object implementing IprettyError
   * @returns {void}
    */
  _setOpts: ( options: any = {}): IprettyError => {
    const tempFadeOpt = {fadeOut: false, fadeOutOpts: ''};
    const tempMulti = {enabled: false, selector: '.multiCheckbox'};
    const callToAction = options.callToAction || 'button';
    const elementError = options.elementError || 'div';
    const classError = options.classError || 'prettyFormError';
    const positionMethod = _valuePositonChecker( options.positionMethod );
    const focusErrorOnClick = options.focusErrorOnClick || true;
    const fadeOutError = options.fadeOutError || tempFadeOpt;
    const multiCheckbox = options.multiCheckbox || tempMulti;

    return {
      callToAction,
      elementError,
      classError,
      positionMethod,
      focusErrorOnClick,
      fadeOutError,
      multiCheckbox
    };
  },

  /** Converts actual element into array
   * @param {HTMLElement} element Element/s selected by user
   * @returns {Array<HTMLElement>} Elements into an array
   */
  _convertToArray: ( element: any ): Array<HTMLElement> => {
    return ( element instanceof Element ) ?
      [element] :
      element;
  },

  /** Romoves old errors displayed in screen
   * @param {EventTarget} element Current form that is validated
   * @param {string} cssSelector css class name to serach and delete
   * @return {void}
   */
  _removeOldErrors: ( element: HTMLElement, cssSelector: string ): void => {
    if ( element ) {
      const oldErrors = element.querySelectorAll( `.${cssSelector}` );
      [].forEach.call( oldErrors, ( error: HTMLElement ) => {
        error.remove();
      });
    }
  },

  /**
   * Creates HTML to hold the error for all invalid inputs
   * @param {NodeList<HTMLElement>} invalids Invalid inputs for actual submited form
   * @param {string} element User or default element defined for error
   * @param {string} classError User or default css class for error
   * @param {string} positionMethod User or default css class for error
   * @return {void}
   */
  _createErrorElement: (
    invalids: NodeList<HTMLElement>,
    element: string,
    classError: string,
    positionMethod: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
  ): void => {
    [].forEach.call( invalids, ( invalid: HTMLInputElement ) => {
      const tempElem = document.createElement( element );
      tempElem.textContent = invalid.validationMessage;
      tempElem.classList.add( `${classError}` );
      invalid.insertAdjacentElement( positionMethod, tempElem );
    });
  },

  /**
   * Set inputs values as empty string for those that are valid
   * @param {NodeList<HTMLElement>} valids Valids inputs when form is submitted
   * @return {void}
   */
  _clearValidInputs: ( valids: NodeList<HTMLElement> ): void => {
    [].forEach.call( valids, ( valid: HTMLInputElement ) => {
      valid.value = '';
    });
  },

  /**
   * Adds CSS class with animation so error can fadeout
   * @returns {MutationObserver} mutation observer constructor
   */
  _fadeOutErrorConfig: (): MutationObserver => {
    return new MutationObserver( mutations => {
      mutations.forEach( mutation => {
        if ( mutation.addedNodes.length > 0 ) {
          ( mutation.addedNodes[ 0 ]: any ).classList.add( 'prettyFormError-fade' );
        }
      });
    });
  },

  /**
   * setup for multi checkboxes that needs validation
   * @param {string} checkboxes NodeList to iterate through
   * @param {string} cssSelector common css selector for all checkboxes
   * @returns {void}
   */
  _changeHandler: ( checkboxes: NodeList<HTMLInputElement>, cssSelector: string ) => {
    const checkedCount = document.querySelectorAll( `${cssSelector}:checked` ).length;

    if ( checkedCount > 0 ) {
      for ( let i = 0; i < checkboxes.length; i++ ) {
        checkboxes[ i ].removeAttribute( 'required' );
      }
    } else {
      for ( let i = 0; i < checkboxes.length; i++ ) {
        checkboxes[ i ].setAttribute( 'required', 'required' );
      }
    }
  }
};
