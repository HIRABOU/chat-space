# eachで並べられるjsonを配列で返す(複数ユーザーがあるため)
# json形式のハッシュモドキが複数入った配列になる
json.array! @users do |user|
  json.id user.id
  json.name user.name
end

