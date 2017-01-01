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

      this.handleClickFormBtn(elem, opts);
    },

    // button click handler
    handleClickFormBtn: function( element, options ) {
      console.log(element);
      var btn = element.find( options.callToAction );

      btn.on( 'click', function( event ) {
        event.preventDefault();
        var invalid = element.find( 'label > :invalid' );

        $( '.' + options.classError ).remove();
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
