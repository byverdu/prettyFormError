/* dev-code */
/* @flow */
/* global IprettyError Positions */
/* end-dev-code */
/** Setting defualt properties values if user
 *  doesn't specify them
 * @param {IprettyError} opts Object implementing IprettyError
 * @returns {IprettyError} Default plugin config
  */
function _optionsConfig( opts: any ): IprettyError {
  var innerOpts = opts || {};
  var positionMethod;
  var classError = innerOpts.classError || 'prettyFormError';
  var callToAction = innerOpts.callToAction || 'button';
  var elementError = innerOpts.elementError || 'div';
  var focusErrorOnClick = innerOpts.focusErrorOnClick || true;
  var tempFadeOpt = {fadeOut: false, fadeOutOpts: ''};
  var tempMulti = {enabled: false, selector: '.multiCheckbox'};
  var fadeOutError = innerOpts.fadeOutError || tempFadeOpt;
  var multiCheckbox = innerOpts.multiCheckbox || tempMulti;
  if ( 'positionMethod' in innerOpts ) {
    positionMethod = innerOpts.positionMethod  === 'after' ? 'afterend' : 'beforebegin';
  } else {
    positionMethod = innerOpts.positionMethod  = 'afterend';
  }

  return {
    classError: classError,
    elementError: elementError,
    positionMethod: positionMethod,
    multiCheckbox: multiCheckbox,
    callToAction: callToAction,
    focusErrorOnClick: focusErrorOnClick,
    fadeOutError: fadeOutError
  };
}


/**
 * Filters the invalid errors
 * @param {HTMLElement} elem parent element, the for itself
 * @returns {Array<HTMLElement>} Invalid form elements
 */
function _getInvalidElems( elem: HTMLElement ): Array<HTMLElement> {
  // fieldset elements also receive the validity pseudo-selector
  var invalids = elem.querySelectorAll( ':invalid:not(fieldset)' );
  var notValidated = [];
  [].forEach.call( invalids, function( invalid: HTMLInputElement ) {
    if ( !invalid.validity.valid ) {
      notValidated.push( invalid );
    }
  });
  return notValidated;
}

/**
   * setup for multi checkboxes that needs validation
   * @param {string} checkboxes NodeList to iterate through
   * @param {string} cssSelector common css selector for all checkboxes
   * @returns {void}
   */
function _changeHandler(
  checkboxes: NodeList<any>,
  cssSelector: string
): void {
  var checkedCount = document.querySelectorAll( cssSelector + ':checked' ).length;

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

/**
 Global factory for PrettyFormErrorInstance
 *  using vanilla JS
 * @param {string} selector CSS selector, should be a form
 * @param {IprettyError} opts possible user options
 * @return {void}
 */
function PrettyFormErrorInstance( selector: string, opts: IprettyError ): void {
  this.options = _optionsConfig( opts );
  var options: IprettyError = this.options;

  function _removeOldErrors( element: HTMLElement ) {
    if ( element ) {
      var oldErrors = element.querySelectorAll( '.' + options.classError );
      [].forEach.call( oldErrors, function( error ) {
        error.remove();
      });
    }
  }

  /**
   * Creates HTML to hold the error for all invalid inputs
   * @param {string} elementError Name tag to create for the error
   * @param {HTMLInputElement} invalidElem Form element to validate
   * @param {Positions} positionMethod position to place the generated markup
   * @return {void}
   */
  function _createErrorElement(
    elementError: string,
    invalidElem: HTMLInputElement,
    positionMethod: Positions
  ) {
    var div = document.createElement( elementError );
    div.classList.add( options.classError );
    div.textContent = invalidElem.validationMessage;
    invalidElem.insertAdjacentElement( positionMethod, div );
  }

   /**
   * Add click eventlistener
   * @param {HTMLElement} elem Form element
   * @return {void}
   */
  function _clickHandler( elem: HTMLElement ) {
    var caller = elem.querySelector( options.callToAction );
    if ( caller ) {
      caller.addEventListener( 'click', function() {
        var invalids = _getInvalidElems( elem );

        // Deleting old errors
        if ( document.querySelector( '.' + options.classError )) {
          _removeOldErrors( elem );
        }
        [].forEach.call( invalids, function ( invalid: HTMLInputElement ) {
          _createErrorElement(
            options.elementError,
            invalid,
            options.positionMethod
          );
        });

        // focusing on first errrored input
        if ( invalids.length > 0 && options.focusErrorOnClick ) {
          invalids[ 0 ].focus();
        }

        // multiCheckbox configuration
        if ( options.multiCheckbox.enabled ) {
          var checkElem = options.multiCheckbox.selector;
          var checkboxes = document.querySelectorAll( checkElem );

          [].forEach.call( checkboxes, function( input: HTMLInputElement ) {
            input.addEventListener( 'change', function() {
              _changeHandler( checkboxes, checkElem );
            });
          });
        }
      });
    }
  }

  if ( typeof jQuery === 'undefined' ) {
    var elem = document.querySelectorAll( selector );
    [].forEach.call( elem, function( element ) {
      _clickHandler( element );
    });
  } else {
    $.each( $( selector ), function( index, item ) {
      _clickHandler( item );
    });
  }
}

function prettyFormError( elem: string, options: IprettyError ): PrettyFormErrorInstance {
  return new PrettyFormErrorInstance( elem, options );
}

// jQuery setup
if ( typeof jQuery !== 'undefined' ) {
  $.fn.prettyFormError = function( options ) {
    var pluginName = 'prettyFormError';
    var dataKey = 'plugin_' + pluginName;
    return this.each( function() {
      if ( !$.data( this, dataKey )) {
        $.data( this, dataKey, prettyFormError( this, options ));
      }
    });
  };
}

// Browser setup
if ( !( 'prettyFormError' in window )) {
  window.prettyFormError = prettyFormError;
}
