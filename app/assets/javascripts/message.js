$(document).on('turbolinks:load', function() {

  // 添付するHTMLの作成
  function buildHTML(message) {
    // 最初は画像とテキストが空として定義している
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
                    ${ textHtmlPart }
                    ${ imageHtmlPart }
                  </div>
                </div>
                  <div class="main-body__box__date">
                      ${ message.time }
                  </div>
                </div>`
    return html;
  }

  //メッセージ送信の非同期通信
  $('#new_message').on('submit', function(e) {
    e.preventDefault(); //動作を一時的に止める
     //form要素内のformDataオブジェクトを作成
    var formData = new FormData(this)
    //#new_messageのaction属性の値を取得して代入
    var url = $(this).attr('action')
    $.ajax({
      url: url,//リクエスト送信先の指定
      type: "POST",//HTTP送信の種類
      data: formData,//サーバにformdataを送信する
      dataType: 'json', //サーバから返されるデータをjson形式に指定
      processData: false,//クエリ文字列に変換しないようにする
      contentType: false //サーバにデータのファイル形式を伝える
      //上記２つはformDataを使用していれば適切な値になっているためfalseにする
    })

    //ajax通信成功時
    //create.json.jbuilderから返ってきたjson形式のデータを受け取る
    .done(function(data) { //create.json.jbuilderのデータを引数にする
      var html = buildHTML(data); //jsonを元にHTMLデータを作成
      $('.main-body').append(html); //貼り付け
      $('#new_message').get(0).reset(); //formの値をimageごとリセット
      //buttonタグのdisabled属性を無効化して連続入力を可能にする
      $('.send-btn').prop('disabled', false);
      //アニメーションでぬるっと入る
      $('.main-body').animate({scrollTop: $('.main-body')[0].scrollHeight}, 1000);
    })
    //ajax通信失敗時(サーバーエラーの時)
    .fail(function() {
      alert('error');//errorと書いたアラートを表示
    })
  });
  //コメント投稿時自動で最新コメント部分（一番下）へ移動
  $('.main-body').scrollTop($('.main-body')[0].scrollHeight);


  //メッセージの自動更新
    function update (){
      // 最後のメッセージのidををdataメソッドで取得して変数に代入
     var lastMessageId = $('.main-body__box__message').last().data('message-id');
     // ajaxの設定
      $.ajax({
        type: 'GET',
        data: {last_id: lastMessageId},
        dataType: 'json',
      }) //messages_controllerへ

      // json形式での通信成功時の記述
     .done(function(data){
        if (data.length != null){
          // jbuilderで翻訳された情報が配列の要素にハッシュとして入ってくる
          // each文で配列を要素毎に分ける
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

  var intervalId = setInterval(update, 5000)
  $(document).on('#new_message', function() {
  clearInterval(intervalId);
  });
});
