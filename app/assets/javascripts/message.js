$(function() {

  function buildHTML(message) {
    var imageHtmlPart = ``;
    var textHtmlPart = ``;
    if (message.image) {
      imageHtmlPart = `<div class="main-body__box__message__comment">
      <img class="main-body__box__message__comment__image" src="${message.image}" alt="${message.alt}">
      </div>`;
    }

    if (message.text) {
      textHtmlPart = `<p class="main-body__box__message__comment__content">
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
                  textHtmlPart +
                  imageHtmlPart +
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
     var lastMessageId = $('.main-body__box__message').last().data('message-id');
      $.ajax({
        type: 'GET',
        data: {last_id: lastMessageId},
        dataType: 'json',
      })
     .done(function(data){
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
