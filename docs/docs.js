$(document).ready(function() {
  $('#fadeOutError').on('change', function() {
    if ($(event.currentTarget).is(':checked')) {
      $('#timeFadeOut').show();
    } else {
      $('#timeFadeOut').hide();
    }
  });

  $('#optionsForm').on('submit', function(event) {
    var userOptions = {};
    var oldOptions = $('.prettyErrorForm').data('plugin_prettyError').options;

    event.preventDefault();

      // $.serializeArray returns form fields in format [{name: '', value: ''}]
      // filter the fields with data
      // prepare user options
    $(event.target).serializeArray().filter(function(formField) {
      return formField.value !== '';
    }).forEach(function(formField) {
      if (formField.value === 'on') {
        userOptions[formField.name] = true;
        $('input[name=' + formField.name + ']').prop('checked', false);
      } else {
        userOptions[formField.name] = formField.value;
        $('input[name=' + formField.name + ']').val('');
      }
    });

    // check if userOptions contains fadeOutError
    if (userOptions.hasOwnProperty('fadeOutError')) {
      var timeOption = userOptions.time;
      var timeValue = isNaN(timeOption) ? timeOption : Number(timeOption);

      userOptions.fadeOutError = {
        fadeOut: true,
        fadeOutOpts: timeValue
      };
      delete userOptions.time;
    }

      // extending previous options with submited ones
    $.extend(true, oldOptions, userOptions);
    $('.prettyErrorForm').prettyError(userOptions);
  });
  var options = {
    multiCheckbox: {
      enabled: true,
      selector: '.multiCheckbox'
    }
  };
  $('.prettyErrorForm').prettyError(options);
});
