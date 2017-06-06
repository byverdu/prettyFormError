// @flow
/* global PrettyFormError */

class PrettyFormErrorFactory {
  element: HTMLElement;
  callToAction: string;
  constructor( element: HTMLElement, options: PrettyFormError ) {
    this.element = element;
    this.callToAction = options.callToAction;
  }

  onClickHandler() {
    const button: ?HTMLElement = this.element.querySelector( `${this.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event: MouseEvent ) => {
        const invalid = this.element.querySelectorAll( ':invalid' );
        if ( invalid.length > 0 ) {
          event.preventDefault();
          console.log( this );
          console.log( invalid );
          console.log( event.currentTarget );
        }
      });
    }
  }
}
