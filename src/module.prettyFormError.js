//      
/* global PrettyFormError */

class PrettyError {
                       
                       
                       
                     

  constructor(
    element             ,
    options                           = {}
  ) {
    const {
      callToAction, elementError, classError
    } = options;

    this.element = element;
    this.callToAction = callToAction || 'button';
    this.elementError = elementError || 'div';
    this.classError = classError || 'prettyFormError';
  }

  _removeOldErrors()       {
    const oldErrors = document.querySelectorAll( `.${this.classError}` );
    [].forEach.call( oldErrors, ( error              ) => {
      error.remove();
    });
  }

  _createErrorElement( element        , errorMsg         )              {
    const tempElem = document.createElement( element );
    tempElem.textContent = errorMsg;
    tempElem.classList.add( this.classError );
    return tempElem;
  }

  _onClickHandler()       {
    const button               = this.element.querySelector( `${this.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event             ) => {
        const invalid = this.element.querySelectorAll( ':invalid' );
        if ( invalid.length > 0 ) {
          event.preventDefault();

          this._removeOldErrors();

          // Append errors to those invalid fields
          invalid.forEach(( input      ) => {
            const elem = this._createErrorElement(
              this.elementError,
              ( input                   ).validationMessage
            );

            input.insertAdjacentElement( 'afterend', elem );
          });
          console.log( invalid );
        }
      });
    }
  }

  init() {
    this._onClickHandler();
  }
}
