$(function() {
  function buildHTML(message) {
    var image_html_part = ``;
    var text_html_part = ``;
    if (message.image != undefined) {
      image_html_part = `<div class="main-body__box__message__comment">
      <img class="main-body__box__message__comment__image" src="${message.image}" alt="${message.alt}">
      </div>`;
    }
    if (message.text != undefined) {
      text_html_part = `<p class="main-body__box__message__comment__content">
                      ${ message.text }
                    </p>`;
    }
    var html = `<div class="main-body__box">
                  <div class="main-body__box__message">
                    <div class="main-body__box__message__user-name">
                      ${ message.user_name }
                    </div>
                  <div class="main-body__box__message__comment">
                    ` +
                  text_html_part +
                  image_html_part +
                  `</div>
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
      $('#new_message').get(0).reset();
      $('.send-btn').prop('disabled', false);
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
    })
    .fail(function() {
      alert('error');
    })
  });
  $('.main-body').scrollTop($('.main-body')[0].scrollHeight);
});
