$(function() {

  function buildHTML(message) {
    var image_html_part = ``;
    var text_html_part = ``;
    if (message.image) {
      image_html_part = `<div class="main-body__box__message__comment">
      <img class="main-body__box__message__comment__image" src="${message.image}" alt="${message.alt}">
      </div>`;
    }

    if (message.text) {
      text_html_part = `<p class="main-body__box__message__comment__content">
                      ${ message.text }
                    </p>`;
    }

    var html = `<div class="main-body__box">
                  <div class="main-body__box__message" data-message-id= ${message.id}>
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

  function ScrollToNewMessage(){
    // $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
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
      console.log(data)
      var html = buildHTML(data);
      $('.main-body').append(html);
      $('#new_message').get(0).reset();
      $('.send-btn').prop('disabled', false);
      //アニメーションでぬるっと入る
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
    })
    //ajax通信失敗時
    .fail(function() {
      alert('error');
    })
  });
  //コメント投稿時自動で最新コメント部分（一番下）へ移動
  $('.main-body').scrollTop($('.main-body')[0].scrollHeight);


  //メッセージの自動更新
    function update (){
     var last_message_id = $('.main-body__box__message').last().attr('data-message-id');
     // console.log(last_message_id);
      $.ajax({
        type: 'GET',
        data: {last_id: last_message_id},
        dataType: 'json',
      })
     .done(function(data){
      console.log(data)
        if (data.length != null){
          $.each(data, function(i, data){
            var html = buildHTML(data);
            $('.main-body').append(html);
            $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
          })
        }
     })
    .fail(function(data){
      alert('自動更新に失敗しました');
    })
  }
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(update, 5000)
};
});
