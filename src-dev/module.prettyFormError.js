// @flow
/* global IprettyError */

function PrettyFormError() {
  let innerOpts;

  function setOpts( options: IprettyError ) {
    const callToAction = options.callToAction || 'button';
    const elementError = options.elementError || 'div';
    const classError = options.classError || 'prettyFormError';
    return {
      callToAction,
      elementError,
      classError
    };
  }

  // retrieve and delete old errors
  function _removeOldErrors(): void {
    const oldErrors = document.querySelectorAll( `.${innerOpts.classError}` );
    [].forEach.call( oldErrors, ( error: HTMLElement ) => {
      error.remove();
    });
  }

  // create elements with validation error
  function _createErrorElement( element: string, errorMsg: string ): HTMLElement {
    const tempElem = document.createElement( element );
    tempElem.textContent = errorMsg;
    tempElem.classList.add( innerOpts.classError );
    return tempElem;
  }

  // Append click handler when plugin is used with querySelectorAll
  function _clickHandlerNodeList( elements: NodeList<HTMLElement> ) {
    for ( let i = 0; i < elements.length; i++ ) {
      _onClickHandler( elements[ i ]);
    }
  }

  function _onClickHandler( element: HTMLElement ): void {
    const button: ?HTMLElement = element.querySelector( `${innerOpts.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event: MouseEvent ) => {
        const invalid = element.querySelectorAll( ':invalid' );
        if ( invalid.length > 0 ) {
          event.preventDefault();

          _removeOldErrors();

          // Append errors to those invalid fields
          invalid.forEach(( input: any ) => {
            const elem = _createErrorElement(
              innerOpts.elementError,
              ( input: HTMLInputElement ).validationMessage
            );

            input.insertAdjacentElement( 'afterend', elem );
          });
          console.log( invalid );
        }
      });
    }
  }

  return {
    init: (
      element,
      options: IprettyError | Object = {}
 ) => {
      innerOpts = setOpts( options );
      element instanceof NodeList ?
      _clickHandlerNodeList( element ) :
      _onClickHandler( element );
    }
  };
}
