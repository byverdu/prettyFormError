// @flow
/* global PrettyFormError */

class PrettyError {
  element: HTMLElement;
  callToAction: string;
  elementError: string;
  classError: string;

  constructor(
    element: HTMLElement,
    options: PrettyFormError | Object = {}
  ) {
    const {
      callToAction, elementError, classError
    } = options;

    this.element = element;
    this.callToAction = callToAction || 'button';
    this.elementError = elementError || 'div';
    this.classError = classError || 'prettyFormError';
  }

  _removeOldErrors(): void {
    const oldErrors = document.querySelectorAll( `.${this.classError}` );
    [].forEach.call( oldErrors, ( error: HTMLElement ) => {
      error.remove();
    });
  }

  _createErrorElement( element: string, errorMsg: string ): HTMLElement {
    const tempElem = document.createElement( element );
    tempElem.textContent = errorMsg;
    tempElem.classList.add( this.classError );
    return tempElem;
  }

  _onClickHandler(): void {
    const button: ?HTMLElement = this.element.querySelector( `${this.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event: MouseEvent ) => {
        const invalid = this.element.querySelectorAll( ':invalid' );
        if ( invalid.length > 0 ) {
          event.preventDefault();

          this._removeOldErrors();

          // Append errors to those invalid fields
          invalid.forEach(( input: any ) => {
            const elem = this._createErrorElement(
              this.elementError,
              ( input: HTMLInputElement ).validationMessage
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
