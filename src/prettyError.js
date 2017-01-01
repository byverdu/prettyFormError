// prettyError jQuery plugin

;( function( $, window, document, undefined ) { // eslint-disable-line
  var pluginName = 'prettyError';
  var dataKey = 'plugin_' + pluginName;

  // Plugin constructor
  var Plugin = function( element, options ) {
    this.element = $(element);
    this.options = {
      classError: 'prettyError',
      positionMethod: 'after',
      elementError: 'div',
      callToAction: 'button',
      focusErrorOnClick: true
    };

    this.init( options );
  };

  Plugin.prototype = {
    init: function( options ) {
      $.extend( this.options, options );

      var elem = this.element;
      var opts = this.options;

      this.handleClickCallToAction( elem, opts );
    },

    // button click handler
    handleClickCallToAction: function( element, options ) {
      var btn = element.find( options.callToAction );

      btn.on( 'click', function( event ) {
        event.preventDefault();
        // targeting all invalid errors,
        // fieldset elements also receive the validity pseudo-selector
        var invalid = element.find( ':invalid' ).not( 'fieldset' );

        // removing the old errors
        $( '.' + options.classError ).remove();
        // adding new styles to each invalid field
        $.each( invalid, function( index, value ) {
          var errors = $('<' + options.elementError + '>')
            .addClass( options.classError )
            .text( value.validationMessage );
          // position for error message -> before or after
          $( value )[options.positionMethod]( errors );
        });
        if ( options.focusErrorOnClick && invalid.length > 1 ) {
          invalid[0].focus();
        }
      });
    }
  };

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, dataKey ) ) {
        $.data( this, dataKey, new Plugin( this, options ) );
      }
    });
  };
}( jQuery, window, document ));
