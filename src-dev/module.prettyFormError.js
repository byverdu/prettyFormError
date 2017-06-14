// @flow
/* global IprettyError */

/** Global factory for PrettyFormError
 *  using vanilla JS
 * @returns {Function} init(element, options)
 */
function PrettyFormError() {
  let innerOpts;

  /** Setting defualt properties values if user
   *  doesn't specify them
   * @param {IprettyError} options Object implementing IprettyError
   * @returns {void}
   */
  function _setOpts( options: IprettyError ) {
    const callToAction = options.callToAction || 'button';
    const elementError = options.elementError || 'div';
    const classError = options.classError || 'prettyFormError';
    const positionMethod = options.positionMethod || 'beforebegin';
    return {
      callToAction,
      elementError,
      classError,
      positionMethod
    };
  }


  /** Converts actual element into array
   * @param {HTMLElement} element Element/s selected by user
   * @returns {Array<HTMLElement>} Elements into an array
   */
  function _convertToArray( element ): Array<HTMLElement> {
    return ( element instanceof Element ) ?
      [element] :
      element;
  }


  /** Romoves old errors displayed in screen
   * @param {EventTarget} event Current form that is validated
   * @return {void}
   */
  function _removeOldErrors( event: EventTarget ): void {
    if ( event ) {
      const oldErrors = ( event: window.HTMLElement ).parentElement.querySelectorAll( `.${innerOpts.classError}` );
      [].forEach.call( oldErrors, ( error: HTMLElement ) => {
        error.remove();
      });
    }
  }

  /**
   * Creates HTML to hold the error for all invalid inputs
   * @param {NodeList<HTMLElement>} invalids Invalid inputs for actual submited form
   * @param {string} element User or default element defined for error
   * @param {string} classError User or default css class for error
   * @param {string} positionMethod User or default css class for error
   * @return {void}
   */
  function _createErrorElement(
    invalids: NodeList<HTMLElement>,
    element: string,
    classError: string,
    positionMethod: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
  ): void {
    [].forEach.call( invalids, ( invalid: HTMLInputElement ) => {
      const tempElem = document.createElement( element );
      tempElem.textContent = invalid.validationMessage;
      tempElem.classList.add( `${classError}` );
      invalid.insertAdjacentElement( positionMethod, tempElem );
    });
  }

  /**
   * Applies click handler for collection
   * @param {*} elements Array of HTMLElements
   * @return {void}
   */
  function _clickHandlerNodeList( elements: any ): void {
    for ( let i = 0; i < elements.length; i++ ) {
      _onClickHandler( elements[ i ]);
    }
  }

  /**
   * Set inputs values as empty string for those that are valid
   * @param {NodeList<HTMLElement>} valids Valids inputs when form is submitted
   * @return {void}
   */
  function _clearValidInputs( valids: NodeList<HTMLElement> ): void {
    [].forEach.call( valids, ( valid: HTMLInputElement ) => {
      valid.value = '';
    });
  }

  /**
   * Append click event for element within the form
   * @param {HTMLElement} element form element to apply
   * @return {void}
   */
  function _onClickHandler( element: HTMLElement ): void {
    const button: ?HTMLElement = element.querySelector( `${innerOpts.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event: MouseEvent ) => {
        event.preventDefault();
        const invalids = element.querySelectorAll( ':invalid' );
        const valids = element.querySelectorAll( ':valid' );

        // removing old errors
        if ( document.querySelector( `.${innerOpts.classError}` )) {
          _removeOldErrors( event.currentTarget );
        }

        // adding new errors
        if ( invalids.length > 0 ) {
          _createErrorElement(
            invalids,
            innerOpts.elementError,
            innerOpts.classError,
            // $FlowFixMe
            innerOpts.positionMethod
          );
        }

        // clearing valid inputs
        if ( invalids.length === 0 && valids.length > 0 ) {
          _clearValidInputs( valids );
        }
      });
    }
  }

  return {
    init: (
      element,
      options: IprettyError | Object = {}
 ) => {
      const isHTMLElement = element instanceof Element ||
        element instanceof NodeList ||
        element instanceof HTMLCollection;
      let tempElem;

      // seting default element for empty case
      isHTMLElement ?
        tempElem = _convertToArray( element ) :
        tempElem = document.querySelectorAll( 'form' );

      // seting user props or default
      // and adding click handler
      innerOpts = _setOpts( options );
      _clickHandlerNodeList( tempElem );
    }
  };
}
