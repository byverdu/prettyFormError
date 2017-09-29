/* global prettyFormError */
document.addEventListener( 'DOMContentLoaded', function() {
  console.log( 'DOMContentLoaded' );

  document.querySelector( '#fadeOutError' )
    .addEventListener( 'change', function() {
      if ( event.currentTarget.checked ) {
        document.querySelector( '#timeFadeOut' ).style.display = 'block';
      } else {
        document.querySelector( '#timeFadeOut' ).style.display = 'none';
      }
    });

  // Get user options after submitting the form
  document.querySelector( '#optionsForm' )
    .addEventListener( 'submit', function( event ) {
      event.preventDefault();
      var oldErrors = document.querySelectorAll( '*[class*=prettyFormError]' );
      var inputs = document.querySelectorAll( 'input[name=optionsForm]' );
      var optionsPlugin = {};

      [].forEach.call( oldErrors, function( error ) {
        error.remove();
      });
      [].forEach.call( inputs, function( field ) {
        if ( field.type === 'text' && field.value !== '' ) {
          optionsPlugin[ field.id ] = field.value;
          field.value = '';
        }
        if ( field.type === 'checkbox' ) {
          optionsPlugin[ field.id ] = field.checked;
          field.checked = false;
        }
        if ( field.type === 'radio' ) {
          if ( field.id === 'classError' && field.checked ) {
            optionsPlugin[ field.id ] = field.value;
          }
          field.checked = false;
        }
      });
      var opts = {
        fadeOut: optionsPlugin.fadeOutError,
        timer: optionsPlugin.timer
      };
      optionsPlugin.fadeOutError === true ? optionsPlugin.fadeOutError =  opts :
      optionsPlugin.fadeOutError;
      prettyFormError( '.prettyErrorForm', optionsPlugin );
    });
  prettyFormError( '.prettyErrorForm' );
});
