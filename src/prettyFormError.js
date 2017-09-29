/* dev-code */
/*  */
/* global IprettyError Positions */
/* end-dev-code */
/** Setting default properties values if user
 *  doesn't specify them
 * @param {IprettyError} opts Object implementing IprettyError
 * @returns {IprettyError} Default plugin config
  */
function _optionsConfig( opts ) {
  var innerOpts = opts || {};
  var positionMethod;
  var classError = innerOpts.classError || 'prettyFormError';
  var callToAction = innerOpts.callToAction || 'button';
  var elementError = innerOpts.elementError || 'div';
  var focusErrorOnClick = innerOpts.focusErrorOnClick || true;
  var tempFadeOpt = {fadeOut: false, timer: 0};
  var tempMulti = {enabled: false, selector: '.multiCheckbox'};
  var fadeOutError = innerOpts.fadeOutError || tempFadeOpt;
  var multiCheckbox = innerOpts.multiCheckbox || tempMulti;

  // selecting default position
  if ( 'positionMethod' in innerOpts ) {
    positionMethod = innerOpts.positionMethod  === 'after' ? 'afterend' : 'beforebegin';
  } else {
    positionMethod = 'afterend';
  }

  // safe checker for setTimeout
  if ( isNaN( Number( fadeOutError.timer ))) {
    var message = 'fadeOutError.timer options is not a number';
    console.error( message );
    fadeOutError.timer = 6000;
  } else {
    fadeOutError.timer = Number( fadeOutError.timer );
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
function _getInvalidElems( elem ) {
  // fieldset elements also receive the validity pseudo-selector
  var invalids = elem.querySelectorAll( ':invalid:not(fieldset)' );
  var notValidated = [];
  [].forEach.call( invalids, function( invalid ) {
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
  checkboxes,
  cssSelector
) {
  var checkedCount = document.querySelectorAll( cssSelector + ':checked' ).length;

  if ( checkedCount > 0 ) {
    for ( var i = 0; i < checkboxes.length; i++ ) {
      checkboxes[ i ].removeAttribute( 'required' );
    }
  } else {
    for ( var j = 0; j < checkboxes.length; j++ ) {
      checkboxes[ j ].setAttribute( 'required', 'required' );
    }
  }
}


/**
 * Throws warn to console if user is targetting an empty selector
 * @param {*} collection of HTMLElements or Jquery
 * @param {string} selector form element
 * @return {void}
 */
function _showErrorForInvalidSelector( collection, selector ) {
  if ( collection.length ===  0 ) {
    var message = 'I couldn\'t fine any DOM element for the selector ' + '"' + selector + '"';
    console.warn( message );
  }
}

/**
 Global factory for PrettyFormErrorInstance
 *  using vanilla JS
 * @param {string} selector CSS selector, should be a form
 * @param {IprettyError} opts possible user options
 * @return {void}
 */
function PrettyFormErrorInstance( selector, opts ) {
  this.options = _optionsConfig( opts );
  var options = this.options;

  // Custom Evnent to inform a new instance is been created so
  // the click event listener can be removed
  document.dispatchEvent( new CustomEvent( 'instance-created' ));

  function _removeOldErrors( element ) {
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
    elementError,
    invalidElem,
    positionMethod
  ) {
    var div = document.createElement( elementError );
    div.classList.add( options.classError );
    div.textContent = invalidElem.validationMessage;
    invalidElem.insertAdjacentElement( positionMethod, div );
  }

  /**
   * Adds CSS class with animation so error can fadeout
   * @returns {MutationObserver} mutation observer constructor
   */
  function _fadeOutErrorConfig() {
    return new MutationObserver( function( mutations ) {
      mutations.forEach( function( mutation ) {
        if ( mutation.addedNodes.length > 0 ) {
          ( mutation.addedNodes[ 0 ] ).classList.add( 'prettyFormError-fade' );
        }
      });
    });
  }

  /**
   * Callback passed to eventListener
   * @param {HTMLFormElement} formElem form element
   * @param {MouseEvent} event click event on button
   * @return {void}
   */
  function _clickCallback( formElem, event ) {
    // prevent trigger default browser error messages
    event.preventDefault();

    var invalids = _getInvalidElems( formElem );
    // Deleting old errors
    if ( document.querySelector( '.' + options.classError )) {
      _removeOldErrors( formElem );
    }

    // create errors
    [].forEach.call( invalids, function( invalid ) {
      _createErrorElement(
        options.elementError,
        invalid,
        options.positionMethod
      );
    });

    // focusing on first errrored input
    if ( options.focusErrorOnClick && invalids.length > 0 ) {
      invalids[ 0 ].focus();
    }

    // fading old errors
    if ( options.fadeOutError.fadeOut ) {
      var observer = _fadeOutErrorConfig();
      const config = { attributes: true, childList: true, characterData: true };
      observer.observe( formElem, config );

      setTimeout( function() {
        _removeOldErrors( formElem );
      }, options.fadeOutError.timer );

      // clearing observer
      if ( invalids.length === 0 ) {
        observer.disconnect();
        observer = null;
      }
    }

    // multiCheckbox configuration
    if ( options.multiCheckbox.enabled ) {
      var checkElem = options.multiCheckbox.selector;
      var checkboxes = document.querySelectorAll( checkElem );

      [].forEach.call( checkboxes, function( input ) {
        input.addEventListener( 'change', function() {
          _changeHandler( checkboxes, checkElem );
        });
      });
    }
    if ( invalids.length === 0 ) {
      // clearing field values
      var valids = formElem.querySelectorAll( ':valid' );

      [].forEach.call( valids, function( valid ) {
        valid.value = '';
      });
      // submiting the form when there's 0 invalid fields
      formElem.submit();
    }
  }

   /**
   * Add click eventlistener
   * @param {HTMLElement} formElem Form element
   * @return {void}
   */
  function _clickHandler( formElem ) {
    var caller = formElem.querySelector( options.callToAction );
    var callee = _clickCallback.bind( event, formElem );
    if ( caller ) {
      document.addEventListener( 'instance-created', function() {
        if ( caller ) {
          caller.removeEventListener( 'click', callee );
        }
      });
      caller.addEventListener( 'click', callee );
    }
  }

  if ( typeof jQuery === 'undefined' ) {
    var elem = document.querySelectorAll( selector );
    _showErrorForInvalidSelector( elem, selector );
    [].forEach.call( elem, function( element ) {
      _clickHandler( element );
    });
  } else {
    var $elem = $( selector );
    _showErrorForInvalidSelector( $elem, selector );
    $.each( $elem, function( index, item ) {
      _clickHandler( item );
    });
  }
}

/**
 * Public method
 * @param {string} formElem css selector to target the form
 * @param {IprettyError} options IprettyError
 * @returns {PrettyFormErrorInstance} new instance
 */
function prettyFormError( formElem, options ) {
  return new PrettyFormErrorInstance( formElem, options );
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

// CommonJS support
if ( typeof module === 'object' && typeof module.exports === 'object' ) {
  module.exports = prettyFormError;
}
