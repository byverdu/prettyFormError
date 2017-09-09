/* dev-code */
/* @flow */
/* global IprettyError */
/* end-dev-code */
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
      [].forEach.call( oldErrors, function( error ) {
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
