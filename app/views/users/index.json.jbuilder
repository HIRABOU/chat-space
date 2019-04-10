# eachで並べられるjsonを配列で返す(複数ユーザーの可能性があるため)
# json形式(ハッシュモドキ)のレコードが複数入った配列になる
# それぞれを順に並べてjson形式に変換
json.array! @users do |user|
  json.id user.id
  json.name user.name
end
# 変換したレコードを配列として返す
