var optsChecker = {
  positionMethod: function (userOptions) {
    if (userOptions.positionMethod !== undefined &&
      userOptions.positionMethod !== 'after' &&
      userOptions.positionMethod !== 'before'
    ) {
      console.warn(
        'positionMethod prop values should be "after" or "before", a default "after" value has been assigned'
      );
      userOptions.positionMethod = 'after';
    }
  },
  fadeOut: function(userOptions) {
    if (userOptions.hasOwnProperty('fadeOutError')) {
      var timeOption = userOptions.time;
      var timeValue = isNaN(timeOption) ? timeOption : Number(timeOption);

      userOptions.fadeOutError = {
        fadeOut: true,
        fadeOutOpts: timeValue
      };
      delete userOptions.time;
    }
  },
  focusErrorOnClick: function(userOptions) {
    if (userOptions.hasOwnProperty('focusErrorOnClick')) {
      userOptions.focusErrorOnClick = false;
    }
  }
};

function getFormValues(userOptions, formField) {
  if (formField.value === 'on') {
    userOptions[formField.name] = true;
    $('input[name=' + formField.name + ']').prop('checked', false);
  } else {
    userOptions[formField.name] = formField.value;
    $('input[name=' + formField.name + ']').val('');
  }
}

$(document).ready(function() {
  $('#fadeOutError').on('change', function() {
    if ($(event.currentTarget).is(':checked')) {
      $('#timeFadeOut').show();
    } else {
      $('#timeFadeOut').hide();
    }
  });

  $('#optionsForm').on('submit', function(event) {
    $('#timeFadeOut').hide();
    var userOptions = {};
    var oldOptions = $('.prettyErrorForm').data('plugin_prettyError').options;

    event.preventDefault();

      // $.serializeArray returns form fields in format [{name: '', value: ''}]
      // filter the fields with data
      // prepare user options
    $(event.target)
      .serializeArray()
      .filter(function(formField) {
        return formField.value !== '';
      })
      .forEach(function(formField) {
        getFormValues(userOptions, formField);
      });

    optsChecker.fadeOut(userOptions);
    optsChecker.focusErrorOnClick(userOptions);
    optsChecker.positionMethod(userOptions);
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
