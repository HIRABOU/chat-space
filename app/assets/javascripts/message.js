$(function() {
  //メッセージ表示のHTMLを生成
  function buildHTML(message) {
    //通常時は何もからのHTMLを生成
    var image_html_part = ``;
    var text_html_part = ``;
    //画像が投稿された場合のHTML
    if (message.image) {
      image_html_part = `<div class="main-body__box__message__comment">
      <img class="main-body__box__message__comment__image" src="${message.image}" alt="${message.alt}">
      </div>`;
    }
    //メッセージが投稿された場合のHTML
    if (message.text) {
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

  //メッセージ送信の非同期通信
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
    //ajax通信成功時
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-body').append(html);
      $('#new_message').get(0).reset();
      $('.send-btn').prop('disabled', false);
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
    })
    //ajax通信失敗時
    .fail(function() {
      alert('error');
    })
  });
  //コメント投稿時自動で最新コメント部分（一番下）へ移動
  $('.main-body').scrollTop($('.main-body')[0].scrollHeight);
});
