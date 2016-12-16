// prettyError jQuery plugin

;( function( $, window, document, undefined ) { // eslint-disable-line
  var pluginName = 'prettyError';
  var dataKey = 'plugin_' + pluginName;

  // Plugin constructor
  var Plugin = function( element, options ) {
    this.element = $(element);
    this.options = {
      classError: 'prettyError',
      position: 'after'
    };

    this.init( options );
  };

  Plugin.prototype = {
    init: function( options ) {
      $.extend( this.options, options);

      var elem = this.element;
      var opts = this.options;

      this.handleClickFormBtn(elem, opts);
    },

    // button click handler
    handleClickFormBtn: function( element, options ) {
      var classError = options.classError;
      var btn = element.find( '.prettyErrorBtn' );
      console.log(btn,element);
      btn.on( 'click', function ( event ) {
        console.log('click');
        event.preventDefault();
        var invalid = element.find( 'label > :invalid' );

        $( '.' + classError ).remove();
        $.each( invalid, function( index, value ) {
          var errors = $('<div>').addClass(classError).text(value.validationMessage);
          // position -> before or after
          $(value)[options.position](errors);
        });
        if (invalid.length > 1) {
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
