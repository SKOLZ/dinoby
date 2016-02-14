$(document).ready(function () {

  var opts = {
    lines: 13 // The number of lines to draw
  , length: 0 // The length of each line
  , width: 5 // The line thickness
  , radius: 13 // The radius of the inner circle
  , scale: 1 // Scales overall size of the spinner
  , corners: 1 // Corner roundness (0..1)
  , color: '#000' // #rgb or #rrggbb or array of colors
  , opacity: 0.25 // Opacity of the lines
  , rotate: 0 // The rotation offset
  , direction: 1 // 1: clockwise, -1: counterclockwise
  , speed: 1 // Rounds per second
  , trail: 60 // Afterglow percentage
  , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
  , zIndex: 2e9 // The z-index (defaults to 2000000000)
  , className: 'spinner' // The CSS class to assign to the spinner
  , top: '50%' // Top position relative to parent
  , left: '50%' // Left position relative to parent
  , shadow: false // Whether to render a shadow
  , hwaccel: false // Whether to use hardware acceleration
  , position: 'absolute' // Element positioning
  }

  $('form.preorder-form').submit(function(event) {
    event.preventDefault();
    var email = $('form.preorder-form input.preorder-input.preorder-text').val();
    var spinner = new Spinner(opts).spin();
    $('form.preorder-form').append(spinner.el);
    $('form.preorder-form input.preorder-input.preorder-text').prop('disabled', true);
    $('form.preorder-form input.preorder-input.preorder-submit').prop('disabled', true);
    $.ajax({
      url: 'https://xekw5y44jf.execute-api.us-east-1.amazonaws.com/prod/subscribers',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ "subscriber": { "email": email }}),
      success: function(data, textStatus, jqXHR) {
        $('.spinner').remove();
        $('form.preorder-form input.preorder-input.preorder-text').prop('disabled', false);
        $('form.preorder-form input.preorder-input.preorder-submit').prop('disabled', false);
        $('.preorder-success').show()
      },
      error: function(data, textStatus, jqXHR) {
        $('.spinner').remove();
        $('form.preorder-form input.preorder-input.preorder-text').prop('disabled', false);
        $('form.preorder-form input.preorder-input.preorder-submit').prop('disabled', false);
        $('.preorder-error').show()
      }
    });
  })
});
