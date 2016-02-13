$(document).ready(function () {

  $('form.preorder-form').submit(function(event) {
    var email = $('form.preorder-form input.preorder-input.preorder-text').val()
    console.log('Submitting: ' + email)
    $.ajax({
      url: 'https://xekw5y44jf.execute-api.us-east-1.amazonaws.com/prod/subscribers',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ "subscriber": { "email": email }}),
      success: function(data, textStatus, jqXHR) {
        console.log('Success!')
        console.log(data)
        console.log(textStatus)
        console.log(jqXHR)
      },
      error: function(data, textStatus, jqXHR) {
        console.log('Error!')
        console.log(data)
        console.log(textStatus)
        console.log(jqXHR)
      }
    });
    event.preventDefault();
  })
});
