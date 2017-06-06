//      
/* global PrettyFormError */

class PrettyFormErrorFactory {
                       
                       
  constructor( element             , options                  ) {
    this.element = element;
    this.callToAction = options.callToAction;
  }

  onClickHandler() {
    const button               = this.element.querySelector( `${this.callToAction}` );

    if ( button ) {
      button.addEventListener( 'click', ( event             ) => {
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
