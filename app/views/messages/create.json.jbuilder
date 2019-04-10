# json形式に変換してmessage.jsの.doneへ返す
# json.KEY VALUEで記述する

# messages#createが動いた時にmessageカラムに値がある場合
if @message.message.present?
  json.text @message.message
end
# messages#createが動いた時にimageカラムに値がある場合
if @message.image.present?
  json.image @message.image.url
  json.alt  @message.image.filename
end
json.user_id @message.user_id
json.group_id @message.group_id
json.user_name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
# 自動更新に伴いidもデータとして渡す
json.id @message.id

