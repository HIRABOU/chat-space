$(function() {
  function buildHTML(message) {
    var html = `<div class="main-body__box">
                  <div class="main-body__box__message">
                    <div class="main-body__box__message__user-name">
                      ${ message.user_name }
                    </div>
                  <div class="main-body__box__message__comment">
                    <p class="main-body__box__message__comment__content">
                      ${ message.text }
                    </p>
                  </div>
                </div>
                  <div class="main-body__box__date">
                      ${ message.time }
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-body').append(html);
      $('.main-body').val('');
      $('#input-box__text').val('');
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert('error');
    })
  });
});
