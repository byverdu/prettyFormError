// // 
// /* global IprettyError */

// import { utils } from './utils';

// /** Global factory for PrettyFormError
//  *  using vanilla JS
//  * @returns {Function} init(element, options)
//  */

// function PrettyFormError() {
//     /**
//    * Applies click handler for collection
//    * @param {*} elements Array of HTMLElements
//    * @param {*} options User options or defaults
//    * @return {void}
//    */
//   function _clickHandlerNodeList( elements, options ) {
//     for ( let i = 0; i < elements.length; i++ ) {
//       _onClickHandler( elements[ i ], options );
//     }
//   }

//   /**
//    * Append click event for element within the form
//    * @param {HTMLElement} element form element to apply
//    * @param {*} options User options or defaults
//    * @return {void}
//    */
//   function _onClickHandler( element, options ) {
//     const button = element.querySelector( `${options.callToAction}` );

//     if ( button ) {
//       button.addEventListener( 'click', ( event ) => {
//         event.preventDefault();
//         const invalids = element.querySelectorAll( ':invalid' );
//         const valids = element.querySelectorAll( ':valid' );

//         // removing old errors
//         if ( !options.fadeOutError.fadeOut && document.querySelector( `.${options.classError}` )) {
//           utils._removeOldErrors( element,  options.classError );
//         }
//         // fading old errors
//         if ( options.fadeOutError.fadeOut ) {
//           let observer = utils._fadeOutErrorConfig();
//           const config = { attributes: true, childList: true, characterData: true };
//           observer.observe( element, config );

//           setTimeout(() => {
//             utils._removeOldErrors( element,  options.classError );
//           }, 6200 );

//           // clearing observer
//           if ( invalids.length === 0 && valids.length > 0 ) {
//             observer.disconnect();
//             observer = null;
//           }
//         }

//         // adding new errors
//         if ( invalids.length > 0 ) {
//           utils._createErrorElement(
//             invalids,
//             options.elementError,
//             options.classError,
//             options.positionMethod
//           );
//         }

//         // clearing valid inputs
//         if ( invalids.length === 0 && valids.length > 0 ) {
//           utils._clearValidInputs( valids );
//         }

//         // focusing on first errrored input
//         if ( invalids.length > 0 && options.focusErrorOnClick ) {
//           invalids[ 0 ].focus();
//         }

//         // multiCheckbox configuration
//         if ( options.multiCheckbox.enabled ) {
//           const selector = options.multiCheckbox.selector;
//           const checkboxes = document.querySelectorAll( selector );

//           [].forEach.call( checkboxes, input => {
//             input.addEventListener( 'change', () => {
//               utils._changeHandler( checkboxes, selector );
//             });
//           });
//         }
//       });
//     }
//   }

//   return {
//     init: (
//       element,
//       options
//  ) => {
//       const isHTMLElement = element instanceof Element ||
//         element instanceof NodeList ||
//         element instanceof HTMLCollection;
//       let tempElem;

//       // seting default element for empty case
//       isHTMLElement ?
//         tempElem = utils._convertToArray( element ) :
//         tempElem = document.querySelectorAll( 'form' );

//       // seting user props or default
//       // and adding click handler
//       _clickHandlerNodeList( tempElem, utils._setOpts( options ));
//     }
//   };
// }

// module.exports = PrettyFormError;

function _optionsConfig(opts) {
  var innerOpts = opts || {};
  var positionMethod = innerOpts.positionMethod  ? 
    (innerOpts.positionMethod  === 'after' ? 'afterend' : 'beforebegin') : innerOpts.positionMethod  = 'afterend';
  var classError = innerOpts.classError || 'prettyFormError'

  return {
    positionMethod: positionMethod,
    classError: classError      
  }
}


function PrettyFormErrorInstance(selector, opts) {
  var options = _optionsConfig(opts);

  function _removeOldErrors ( element ) {
    if ( element ) {
      var oldErrors = element.querySelectorAll( "." + options.classError );
      [].forEach.call( oldErrors, ( error ) => {
        error.remove();
      });
    }
  }

  function _createErrorElement( elemToAppend, textError ) {
    var div = document.createElement('div');
    div.classList.add(options.classError);
    div.textContent = textError;
    elemToAppend.insertAdjacentElement(options.positionMethod , div);
  }

  function _clickHandler( elem ) {
    var invalids = elem.querySelectorAll(':invalid');
    elem.querySelector('button').onclick = function () {
      // Deleting old errors
      if (document.querySelector("." + options.classError)) {
          _removeOldErrors( elem );
        }
      [].forEach.call(invalids, function (invalid) {
        _createErrorElement(
          invalid,
          invalid.validationMessage
        );
      });
    }
  };

  if (typeof jQuery === 'undefined') {
    var elem = document.querySelectorAll(selector);
    [].forEach.call(elem, function (element) {
      _clickHandler(element);
    });
  } else {
    $.each($(selector), function (index, item) {
      _clickHandler(item);
    })
  }
}

function prettyFormError(elem, options) {
  return new PrettyFormErrorInstance(elem, options);
}

if (typeof jQuery !== 'undefined') {
  $.fn.prettyFormError = function (options) {
    var pluginName = 'prettyFormError';
    var dataKey = 'plugin_' + pluginName;
    return this.each(function () {
      if (!$.data(this, dataKey)) {
        $.data(this, dataKey, prettyFormError(this, options));
      }
    });
  }
}
