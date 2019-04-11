//インクリメンタルサーチ
$(document).on('turbolinks:load', function() {
var search_list = $(".user-search-result");
  //該当ユーザーの情報をHTMLで追加
  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix" id='chat-group-user-${user.id}'>
                <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${ user.name }">追加</a>
              </div>`
  search_list.append(html);//該当部位にユーザー情報を追加
  }
  //一致がない場合や検索欄を空にした時のの表示をするHTMLの作成
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix" id='chat-group-user'>${user}</div>`
  search_list.append(html);
  }

  //appendUserで追加後にメンバーリストに追加するHTMLを作成
  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
    return html
  }

  $("#user-search-field").on("keyup", function() {//文字入力するたびにイベントを発火させる
    var input = $("#user-search-field").val();//フォームに入力した値を取得して代入
    $.ajax({
      type: 'GET',//HTTP送信の種類を指定
      url: "/users",//usersController#indexを動かすように指定
      data: { keyword: input },//key valueのセットでハッシュにする
      //発火時にparams[:keyword]で値を取得する
      dataType: 'json'//返ってくるデータをjson形式に指定
    })

    .done(function(users) {//jbuilderからjson形式で値を受け取る
      $(".user-search-result").empty();//発火時に毎回値を空にする
      //空にしないと入力毎にユーザーが追加され続ける
      if (users.length !== 0 && input.length !== 0) {//一致するユーザーが存在する場合としない場合で条件分岐
        users.forEach(function(user) {//配列なので順に並べて処理をする
          appendUser(user);//それぞれのHTMLを作成する
        });
      } else {
        appendNoUser("一致するユーザーは存在しません")//存在しないと表示
      }
    })
    .fail(function() {//ajax通信失敗時(サーバーエラーの時)
      alert('ユーザー検索に失敗しました')//アラートを表示
    });
  });

  $(".user-search-result").on('click','.user-search-add', function() {//追加したユーザーHTMLにあるuser-search-add(aタグ)をクリック時に発火と指定
    var id = $(this).data('user-id');//カスタム属性で追加したidを取得して代入
    var name = $(this).data('user-name');//同様に追加したnameを取得して代入
    var insertHTML = buildHTML(id, name);//上記情報を渡してHTMLを作成
    $("#user-search-field").val("");//追加後検索フォームの値を空にする
    $('#chat-group-users').append(insertHTML);//メンバーリストに追加する
    $(this).parent('.chat-group-user').remove();//追加したユーザーを一覧から削除
  });

  $("#chat-group-users").on('click', '.user-search-remove', function() {//メンバーリストに追加されたユーザーHTMLにあるuser-search-remove(aタグ)をクリック時に発火と指定
    var id = $(this).data('user-id');//カスタム属性で追加したidを取得して代入
    $(`#chat-group-user-${id}`).remove();//メンバーリストから該当ユーザーを削除する
  });
});

