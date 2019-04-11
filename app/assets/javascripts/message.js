$(document).on('turbolinks:load', function() {

  // 添付するHTMLの作成
  function buildHTML(message) {
    // 最初は画像とテキストが空として定義している
    var imageHtmlPart = ``;
    var textHtmlPart = ``;
    if (message.image) {//画像がある場合に上書き
      imageHtmlPart = `<div class="main-body__box__message__comment">
      <img class="main-body__box__message__comment__image" src="${message.image}" alt="${message.alt}">
      </div>`;
    }

    if (message.text) {//文字がある場合に上書き
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
  $('#new_message').on('submit', function(e) {//formのsendボタンを押したら発火するように指定
    e.preventDefault(); //動作を一時的に止める
    var formData = new FormData(this)//form要素内のformDataオブジェクトを作成
    var url = $(this).attr('action')//#new_messageのaction属性の値を取得して代入
    $.ajax({
      url: url,//リクエスト送信先の指定
      type: "POST",//HTTP送信の種類
      data: formData,//サーバにformdataを送信する
      dataType: 'json', //サーバから返されるデータをjson形式に指定
      processData: false,//クエリ文字列に変換しないようにする
      contentType: false //サーバにデータのファイル形式を伝える
      //上記２つはformDataを使用していれば適切な値になっているためfalseにする
    })//messages_controllerへ

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

    .fail(function() {//ajax通信失敗時(サーバーエラーの時)
      alert('error');//errorと書いたアラートを表示
    })
  });
  $('.main-body').scrollTop($('.main-body')[0].scrollHeight);//コメント投稿時自動で最新コメント部分（一番下）へ移動


  //メッセージの自動更新
    function update (){
     var lastMessageId = $('.main-body__box__message').last().data('message-id');//最後のメッセージのidををdataメソッドで取得して変数に代入
      $.ajax({
        type: 'GET',//HTTP送信の種類を指定
        data: {last_id: lastMessageId},//key valueのセットでハッシュにする
        dataType: 'json',//返ってくるデータをjson形式に指定
      })//urlの指定がない場合は現在のページのURL(location.href)が初期値
      //今回はmessagesController#indexになる

      // json形式での通信成功時の記述
     .done(function(data){//jbuilderからjson形式で値を受け取る
        if (data.length != null){//新しい情報が追加されている場合
          // each文で配列を要素毎に分ける
          data.forEach(function(data){
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
