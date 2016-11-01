
function PrettyFormError( element, options ) {
  this.$element = $( element );
  this.options = options;
  this.setColor( options );
}

PrettyFormError.prototype.setColor = function () {
  this.$element.css({
    color: this.options.color,
    background: this.options.background
  });
};

( function ( $ ) {
  $.fn.prettyFormError = function ( options ) {
    const opts = options || $.fn.prettyFormError.settings;
    $.extend({}, new PrettyFormError( this, opts ));
    return this;
  };

  // Ability to set settings prior the plugin is initialized
  $.fn.prettyFormError.settings = {
    color: '',
    background: ''
  };
  // $.fn.prettyFormError.settings.color = 'red';
  // $.fn.prettyFormError.settings.background = 'purple';
  //
  // console.log($.fn.prettyFormError.settings);

}( jQuery ));
