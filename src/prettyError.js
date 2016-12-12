/* eslint-disable no-param-reassign */
// prettyError jQuery plugin

function PrettyError( element, options ) {
  this.$element = $( element );
  this.options = options || {};
}

( function ( $ ) {
  $.fn.prettyError = function ( options ) {
    const opts = options || $.fn.prettyError.settings;
    $.extend({}, new PrettyError( this, opts ));
    return this.each( function() {
      const elem = $( this );
      const classError = opts.classError;
      const btn = elem.find( '.prettyErrorBtn' );

      btn.on( 'click', function ( event ) {
        event.preventDefault();
        const invalid = elem.find( 'label > :invalid' );
        console.log(invalid)
        $( '.'+classError ).remove();
        $.each( invalid, function( index, value ) {
          const errors = $('<div>').addClass(classError).text(value.validationMessage);
          // console.log(value);

          $(value).after(errors);

        });
      });
    });;
  };

  // Initial plugin settings
  $.fn.prettyError.settings = {
    classError: 'prettyError'
  };
}( jQuery ));

// function PrettyError( element, options ) {
//   this.$element = $( element );
//   this.options = options || {};
//   this.setSettings( options );
// }

// PrettyError.prototype.setSettings = function () {
//   this.$element.css({
//     color: this.options.color,
//     background: this.options.background
//   });
// };

// ( function ( $ ) {
//   $.fn.prettyFormError = function ( options ) {
//     const opts = options || $.fn.prettyFormError.settings;
//     $.extend({}, new PrettyError( this, opts ));
//     return this;
//   };
//
//   // Ability to set settings prior the plugin is initialized
//   $.fn.prettyFormError.settings = {
//     color: '',
//     background: ''
//   };
//   $.fn.prettyFormError.settings.color = 'red';
//   $.fn.prettyFormError.settings.background = 'purple';
//
//
// }( jQuery ));

/*

$(document).ready(function() {
  // adding the required attribute for multiple check boxes
  var allCheckBox = $('.options');

  allCheckBox.attr('required', 'required');

  allCheckBox.change(function() {
    if (allCheckBox.is(':checked')) {
      allCheckBox.removeAttr('required');
    } else {
      allCheckBox.attr('required', 'required');
    }
  });

  // end multiple check boxes setting

  // Custom form validation

  $('form').each(function(el) {
    changeFormUI(el);
  });

  function changeFormUI() {

    $('button').on('click', function(event) {

      event.preventDefault();

      var invalid = $('label > :invalid');

      $('.error').fadeOut('fast');

      invalid.each(function(el) {
        var errors = $('<div>').addClass('error').text(el.validationMessage);

        $(el).after(errors);

      });

      if (invalid.length > 1) {
        invalid[0].focus();
      }
    });
  }
});

*/
