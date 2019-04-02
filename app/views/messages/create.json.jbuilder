if @message.message.present?
  json.text @message.message
end
if @message.image.present?
  json.image @message.image.url
  json.alt  @message.image.filename
end
json.user_id @message.user_id
json.group_id @message.group_id
json.user_name @message.user.name
json.time @message.created_at

